require("dotenv").config()
const Bluebird = require("bluebird")
const { Storage } = require("@google-cloud/storage")
const BUCKET_NAME = process.env.OAKLAND_SCRAPE_BUCKET_2
const storage = new Storage()
const argv = require("yargs")
    .demand("connection")
    .demand("data").argv,
  async = require("async"),
  _ = require("lodash"),
  parse = require("csv-parse"),
  fs = require("fs"),
  redis = require("redis"),
  rediSearchBindings = require("redis-redisearch"),
  rediSearch = require("redisearchclient"),
  fields = require("./redis.schema.js"),
  connection = require(argv.connection),
  client = redis.createClient(connection),
  parser = parse({
    delimiter: ",",
    columns: true,
    auto_parse: true,
  }),
  castCrew = rediSearch(client, "oakland"),
  q = async.queue(function(data, done) {
    castCrew.add(data["parcel_number"], data, function(err, resp) {
      processed += 1
      done(err)
    })
  }, 2)

let parsed = false,
  processed = 0,
  total = 0

rediSearchBindings(redis)

const S = require("string")

q.drain = function() {

  if (parsed && total === processed) {

    console.log("all done", total, "credits added.")
    client.quit()
  }
}

async function getMissing(apn) {
  const [files] = await storage.bucket(BUCKET_NAME).getFiles()
  const fss = await Bluebird.map(
    files,
    file => {
      return new Promise(yes => {
        const s = file.createReadStream()
        let str = ""
        s.on("data", c => {
          str += c
        })
        s.on("finish", () => {
          const d = JSON.parse(str)
          const l = d.length
          total += l
          d.slice(0, l).forEach(s => {
            const v = JSON.parse(s)
            if (v.features[0]) {
              const newKeys = _.keys(v.features[0].attributes).map(
                k =>
                  S(v.fieldAliases[k])
                    .slugify()
                    .underscore().s
              )
              const data = _.fromPairs(
                _.toPairs(v.features[0].attributes).map((p, i) => {
                  p[0] = newKeys[i]
                  if (p[1] === "N" || p[1] === " " || _.isNil(p[1])) {
                    p[1] = "false"
                  }
                  if (_.isBoolean(p[1])) {
                    p[1] = String(p[1])
                  }
                  return p
                })
              )
              q.push(data)
            } else {
              total--
            }
          })
          yes()
        })
      })
    },
    {
      concurrency: 1,
    }
  )
  parsed = true
}

castCrew.createIndex(

  fields.oakland(castCrew),
  function(err) {
    console.log(err)
    getMissing()
  }
)

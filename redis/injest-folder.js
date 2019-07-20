require("dotenv").config()
const Bluebird = require("bluebird")
var { listFiles } = require("list-files-in-dir")
const argv = require("yargs").demand("connection").argv,
  async = require("async"),
  _ = require("lodash"),
  fs = require("fs"),
  redis = require("redis"),
  rediSearchBindings = require("redis-redisearch"),
  rediSearch = require("redisearchclient"),
  fields = require("./redis.schema.js"),
  connection = require(argv.connection),
  client = redis.createClient(connection),
  alamedaParcelIndex = rediSearch(client, "alameda"),
  q = async.queue(function(data, done) {
    alamedaParcelIndex.add(data["parcel_number"], data, function(
      err,
      resp
    ) {
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

function listFiles(dir, ext) {
  return new Promise(yes => {
    listFiles(dir, ext).then(files => {
      yes(files)
    })
  })
}

async function injest(apn) {
  const files = await listFiles("parcels", "json")
  console.log(files);
  const fss = await Bluebird.map(
    files,
    file => {
      return new Promise(yes => {
        const s = fs.createReadStream(file)
        let str = ""
        s.on("data", c => {
          str += c
        })
        s.on("end", () => {
          const d = JSON.parse(str)
          const l = d.length
          total += l
          console.log(total);
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

alamedaParcelIndex.createIndex(
  fields.oakland(alamedaParcelIndex),
  function(err) {
    console.log(err)
    injest()
  }
)

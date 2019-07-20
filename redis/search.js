const argv = require("yargs")
    .demand("searchtype")
    .choices("searchtype", ["alameda"])
    .demand("connection")
    .demand("search").argv,
  redis = require("redis"),
  connection = require(argv.connection),
  rediSearchBindings = require("redis-redisearch"),
  rediSearch = require("redisearchclient"),
  client = redis.createClient(connection),
  fs = require("fs"),
  data = rediSearch(client, argv.searchtype)

rediSearchBindings(redis)

function showResults(err, results) {
  if (err) {
    throw err
  }
  const fields = ["Addresses"]
  const filtered = results.results.filter(o=>o.doc.situs_street_number.length)
  const addresses = filtered.map(o =>
    `${o.doc.situs_street_number}+${o.doc.situs_street_name}+${o.doc.situs_city}`
      .trim()
      .replace(/\s/g, "+")
  )
  const data = filtered.map(o => ({
    Addresses: `${o.doc.situs_street_number} ${o.doc.situs_street_name} ${o.doc.situs_city}`.trim(),
  }))

  console.log(data);

  // const csv = json2csvParser.parse(data)
  // fs.writeFileSync("addr.csv", csv)
  client.quit()
}

searchOpts = {}

if (argv.offset) {
  searchOpts.offset = Number(argv.offset)
}
if (argv.resultsize) {
  searchOpts.numberOfResults = Number(argv.resultsize)
}

data.search(argv.search, searchOpts, showResults)

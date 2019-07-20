## REDISEARCH database for Alameda property		

### Why?

Sites like Zillow, Redfin, Trulia do not let you search by all the parameters on a property. Interesting to perform queries with such data.

### How?

Scraping of the parcel data from <http://gis.acgov.org/Html5Viewer/index.html?viewer=parcel_viewer>

### Use:

Injest the parcel data into an index:

`node redis/injest-folder.js --connection connection.json`

> Note: If the index exists you will need to DROP the index from the *redis-cli*: `FT.DROP aladema`

##### Search:

`node redis/search.js --connection ./connection.json --search=" @buildings:[1 4] @stories:[1 4]  @bldg_area:[2500, 6000] @use_code:1150" --searchtype alameda --offset 0 --resultsize 10000`

See <https://oss.redislabs.com/redisearch/Commands.html#ftsearch>

###### Example parcel:

```objectid    "6711"
apn_book_number    "11"
apn_page_number    "900"
apn_parcel_number    "26"
apn_sub_parcel_number    "1"
clca_category    "false"
sort_parcel    "011 090002601"
parcel_number    "11-900-26-1"
tra_primary_city    "17"
tra_secondary    "001"
situs_street_number    "818"
situs_street_name    "TRESTLE GLEN RD"
situs_unit_number    ""
situs_city    "OAKLAND"
situs_zip_code    "94610"
situs_zip_plus_4    ""
land_value    "144900"
improvement_value    "338100"
clca_land_value    "0"
clca_improvement_value    "0"
homeowners_exemption    "7000"
other_exemption    "0"
total_net_value    "476000"
latest_document_prefix    "2011"
latest_document_series    "281938"
latest_document_date    "1317772800000"
mailing_address_street    "818 TRESTLE GLEN RD"
mailing_address_unit    ""
mailing_address_citystate    "OAKLAND CA"
mailing_address_zip    "94610"
mailing_address_zip4    "2318"
use_code    "1150"
economic_unit_flag    ""
bldg_units    "1"
bldg_class_code    "D6.0A"
bldg_effective_year    "1935"
bldg_area    "2500"
lot_size    "6468"
buildings    "1"
stories    "2"
rooms    "7"
beds    "4"
acre    "false"
acre_flag    "false"
conformity    "false"
additional_sf    "0"
year_built    "1925"
baths    "1.5"
condo    "false"
elevator    "false"
pool    "false"
situs_address    "818 TRESTLE GLEN RD OAKLAND 94610"
mailing_address    "818 TRESTLE GLEN RD OAKLAND CA 94610"
```




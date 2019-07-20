module.exports = {
  alameda: function(search) {
    return [
      search.fieldDefinition.numeric("objectid", true),
      search.fieldDefinition.text("apn_book_number", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("apn_page_number", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("apn_parcel_number", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("apn_sub_parcel_number", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("clca_category", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("sort_parcel", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("parcel_number", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("tra_primary_city", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("tra_secondary", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("situs_street_number", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("situs_street_name", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("situs_unit_number", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("situs_city", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("situs_zip_code", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("situs_zip_plus_4", false, {
        noStem: true,
      }),
      search.fieldDefinition.numeric("land_value", true),
      search.fieldDefinition.numeric("improvement_value", true),
      search.fieldDefinition.numeric("clca_land_value", true),
      search.fieldDefinition.numeric("clca_improvement_value", true),
      search.fieldDefinition.numeric("homeowners_exemption", true),
      search.fieldDefinition.numeric("other_exemption", true),
      search.fieldDefinition.numeric("total_net_value", true),
      search.fieldDefinition.text("latest_document_prefix", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("latest_document_series", false, {
        noStem: true,
      }),
      search.fieldDefinition.numeric("latest_document_date", true),
      search.fieldDefinition.text("mailing_address_street", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("mailing_address_unit", false, {
        noStem: true,
      }),
      search.fieldDefinition.text(
        "mailing_address_citystate",
        false,
        { noStem: true }
      ),
      search.fieldDefinition.text("mailing_address_zip", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("mailing_address_zip4", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("use_code", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("economic_unit_flag", false, {
        noStem: true,
      }),
      search.fieldDefinition.numeric("bldg_units", true),
      search.fieldDefinition.text("bldg_class_code", false, {
        noStem: true,
      }),
      search.fieldDefinition.numeric("bldg_effective_year", true),
      search.fieldDefinition.numeric("bldg_area", true),
      search.fieldDefinition.numeric("lot_size", true),
      search.fieldDefinition.numeric("buildings", true),
      search.fieldDefinition.numeric("stories", true),
      search.fieldDefinition.numeric("rooms", true),
      search.fieldDefinition.numeric("beds", true),
      search.fieldDefinition.text("acre", true, { noStem: true }),
      search.fieldDefinition.text("acre_flag", true, {
        noStem: true,
      }),
      search.fieldDefinition.text("conformity", true, {
        noStem: true,
      }),
      search.fieldDefinition.numeric("additional_sf", true),
      search.fieldDefinition.numeric("year_built", true),
      search.fieldDefinition.numeric("baths", true),
      search.fieldDefinition.text("condo", false, { noStem: true }),
      search.fieldDefinition.text("elevator", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("pool", false, { noStem: true }),
      search.fieldDefinition.text("situs_address", false, {
        noStem: true,
      }),
      search.fieldDefinition.text("mailing_address", false, {
        noStem: true,
      }),
    ]
  },
}

const EnumStringProps = ["date", "redirect_url", "scheme", "http_connect", "url_effective", "remote_ip"]
const EnumFloatProps = ["http_code", "http_version", "num_connects", "num_redirects", "proxy_ssl_verify_result", "remote_port", "size_download", "size_header", "size_request", "size_upload", "speed_download", "speed_upload", "ssl_verify_result", "time_appconnect", "time_connect", "time_namelookup", "time_pretransfer", "time_redirect", "time_starttransfer", "time_total"]
const EnumMetrics = [...EnumStringProps, ...EnumFloatProps]

const typeDefs = `
enum StringProps { ${EnumStringProps.map(val => val).join('\n')} }
enum FloatProps { ${EnumFloatProps.map(val => val).join('\n')} }
enum Metric { ${EnumMetrics.map(val => val).join('\n')} }

type SeriesItem {
  id: ID!
  prop: String!
  series: [Float!]
  dates: [String!]
}

type Page {
  id: ID!
  url: String!
}

type Query {
  pages : [Page]
  series (id: String, prop: FloatProps, limit: Int = 10) : SeriesItem!
}
`;

export {EnumFloatProps, EnumStringProps, EnumMetrics}
export default typeDefs

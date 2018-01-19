const typeDefs = `
# props that resolve string values
enum StringProps {
  date
  redirect_url
  scheme
  http_connect
  url_effective
  remote_ip
}

# props that will resolve float values
enum FloatProps {
  http_code
  http_version
  num_connects
  num_redirects
  proxy_ssl_verify_result
  remote_port
  size_download
  size_header
  size_request
  size_upload
  speed_download
  speed_upload
  ssl_verify_result
  time_appconnect
  time_connect
  time_namelookup
  time_pretransfer
  time_redirect
  time_starttransfer
  time_total
}

type SampleItem {
  prop: String
  series: [Float]
  dates: [String]
}

type Query {
  uptime (prop: FloatProps, limit: Int = 10) : SampleItem!
}
`;

export default typeDefs
// const ref = {
//   "date": "2018-01-05_18:15:02",
//   "http_code": "200",
//   "http_connect": "000",
//   "http_version": "1.1",
//   "num_connects": "2",
//   "num_redirects": "1",
//   "proxy_ssl_verify_result": "0",
//   "redirect_url": "",
//   "remote_ip": "23.41.197.160",
//   "remote_port": "80",
//   "scheme": "HTTP",
//   "size_download": "0",
//   "size_header": "1059",
//   "size_request": "457",
//   "size_upload": "0",
//   "speed_download": "0.000",
//   "speed_upload": "0.000",
//   "ssl_verify_result": "0",
//   "time_appconnect": "1.570115",
//   "time_connect": "1.546212",
//   "time_namelookup": "1.523212",
//   "time_pretransfer": "1.586679",
//   "time_redirect": "1.582743",
//   "time_starttransfer": "1.611789",
//   "time_total": "1.611972",
//   "url_effective": "http://www.honda.com.br/motos/"
// }

let baseUrl = "";
if (process.env.BASEURL) {
  baseUrl = process.env.BASEURL;
}
export default baseUrl;

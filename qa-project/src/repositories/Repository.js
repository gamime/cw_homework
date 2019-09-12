import axios from "axios";

// You can use your own logic to set your local or production domain
const baseDomain = "https://script.google.com/macros/s/AKfycbyBwcovflWPnyCbiQk6aChoNBW4vcOKSLdnFU34V9-yPFFNpNGl/exec";
// The base URL is empty this time due we are using the jsonplaceholder API
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL,
  headers: {},
  data: {}
});

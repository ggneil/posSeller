import axios from 'axios'

let options = {
  timeout: 5000
}
options.baseURL = 'https://cdn.wangdoukeji.com'
// options.baseURL = 'http://localhost'
export default axios.create(options)

const axios = require('axios')

axios.defaults.baseURL = process.env.APP_BACKEND_API

module.exports = axios

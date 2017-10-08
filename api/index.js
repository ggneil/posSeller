const pg_axios = require('axios')
const express = require('express')
let options = {
  timeout: 5000
}
options.baseURL = 'http://localhost'
const axios = pg_axios.create(options)
// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  axios.post('/seller/account/login', { mobile: req.body.mobile, password: req.body.password }).then( (result) => {
    if (result.data.error){
      return res.json({ error: { msg: result.data.error.msg }})
    } else {
      req.session.authUser = result.data
      return res.json({ user : result.data.user })
    }
  }).catch( (err) => {
    res.status(401).json({ message: '服务器异常，请稍后再试' })
  })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}

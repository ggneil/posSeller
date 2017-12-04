const bodyParser = require('body-parser')
const session = require('express-session')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '都点 - 商户中心',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'pos' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#409EFF' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['element-ui','axios'],

    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  // CSS 模块
  css: [
    'element-ui/lib/fc9538/index.css'
  ],
  plugins: [
    { src: '~plugins/element-ui', ssr: true }
  ],
  /*
 ** Add server middleware
 ** Nuxt.js uses `connect` module as server
 ** So most of express middleware works with nuxt.js server middleware
 */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: true,
      rolling: true,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ],
  routes: {
    middleware: 'auth'
  }
}

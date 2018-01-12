const bodyParser = require('body-parser')
const session = require('express-session')
const webpack= require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '豆点 - 商户中心',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '豆点微商城,豆点微小店,豆点收银,豆点批发,豆点零售,豆点餐饮,豆点美业' },
      { name: 'keywords', content: '豆点，做移动互联网时代好用的开店工具，基于SaaS模式，整合资源、深度挖掘，向商户提供强大的微商城系统和完整的移动电商解决方案，在移动零售服务生态里联合服务商、开发者、经营专家，共建服务生态，服务百万商家。' },
      { hid: 'description', name: 'description', content: '豆点，做移动互联网时代好用的开店工具，基于SaaS模式，整合资源、深度挖掘，向商户提供强大的微商城系统和完整的移动电商解决方案，在移动零售服务生态里联合服务商、开发者、经营专家，共建服务生态，服务百万商家。' }
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
    vendor: ['element-ui','axios','jquery'],
    plugins: [
      new webpack.ProvidePlugin (
        {
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        }
      )
    ],
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

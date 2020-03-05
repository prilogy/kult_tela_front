const API_URL_DEFAULT = 'http://localhost:3001/'
require('dotenv').config()

export default {
  mode: 'spa',
  server: {
    port: 3000 // default: 3000
  },
  pageTransition: 'showup',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Культ тела - онлайн армия',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preload',
        href: '/fonts/oswald-v26-latin_cyrillic-500.woff2',
        as: 'font',
        crossorigin: 'anonymous'
      }
    ]
  },
  loading: {
    color: '#eff621',
    height: '4px'
  },
  /*
   ** Global CSS
   */
  css: [
    '~/css/main.css',
    '~/css/reset.css',
    '~/css/fonts.css',
    '~/css/transitions.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/api.js',
    '~/plugins/nuxt-client-init.client.js',
    '~/plugins/global.js',
    {
      src: '~/plugins/socket-io.js',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-compress'
  ],
  'nuxt-compress': {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },

  pwa: {
    meta: {
      theme_color: '#1d1d22',
      name: 'Культ тела',
      lang: 'ru',
      icon: ''
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  env: {
    API_URL: process.env.API_URL || API_URL_DEFAULT
  },
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}

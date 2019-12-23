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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#eff621',
    height: '5px'
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
    '~/plugins/ds.js',
    '~/plugins/axios.js',
    '~/plugins/api.js',
    '~/plugins/nuxt-client-init.client.js'
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
    '@nuxtjs/pwa'
    //'nuxt-client-init-module'
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001/'
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

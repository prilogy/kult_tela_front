const API_URL_DEFAULT = 'http://localhost:3001/'
require('dotenv').config()

export default {
  ssr: false,
  target: 'static',
  server: {
    port: 3000 // default: 3000
  },
  pageTransition: 'showup',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Культ тела. Безопасное похудение онлайн. Иммунитет',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Культ тела - проект для похудения дома или в зале. Генерал Марина Богомолова похудела на 100 кг за 2 года. Смогла она - сможешь и ты!'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Культ тела, похудение онлайн, калорий онлайн, для похудения, в домашних условиях, для похудения онлайн, для похудения онлайн бесплатно, онлайн расчет похудения, онлайн тренировки, домашнее похудение онлайн, онлайн тренировки, в домашних армия похудения, культ тела 4, культ тела личный кабинет, культ тела онлайн армия, онлайн армия, армия безопасного похудения, похудеть в Пенза, Культ тела Пенза, онлайн похудение, онлайн тренировки, фитнес, фитнес онлайн,похудение, похудение дома, диета малышевой, похудеть онлайн, диета, диета для похудения, тренировки онлайн'
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
    'nuxt-compress',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '64496917',
        webvisor: true,
        clickmap: true,
        useCDN: false,
        trackLinks: true,
        accurateTrackBounce: true
      }
    ]
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
    manifest: {
      name: 'Cult Tela',
      lang: 'ru',
      useWebmanifestExtension: false
    },
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
    extend(config, ctx) {
    }
  }
}

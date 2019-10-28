export default function({ $axios, store }) {
  $axios.onRequest(config => {
    config.headers.common['token'] = store.getters['auth/GET_TOKEN']
    config.baseURL = process.env.API_URL
  })

  $axios.onError(error => {
    store.dispatch('error/SET_ERROR', error.response.data.error)
  })
}

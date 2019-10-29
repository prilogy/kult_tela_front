export default function({ $axios, store }) {
  $axios.onRequest(config => {
    config.headers.common['token'] = store.getters['auth/GET_TOKEN']
    config.baseURL = process.env.API_URL
  })

  $axios.onError(error => {
    if (!error.response)
      store.dispatch('error/SET_ERROR', 'Отсутствует подключение к серверу')
    else store.dispatch('error/SET_ERROR', error.response.data.error)
  })
}

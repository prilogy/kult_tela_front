export default function({ $axios, store, error }) {
  $axios.onRequest(config => {
    config.headers.common['token'] = store.getters['auth/GET_TOKEN']
    config.baseURL = process.env.API_URL
  })

  $axios.onError(err => {
    if (!err.response) {
      error({
        statusCode: 501,
        message: 'Ведутся технические работы, попробуйте заново позднее'
      })
      store.dispatch('error/SET_ERROR', 'Отсутствует подключение к серверу')
    } else store.dispatch('error/SET_ERROR', err.response.data.error)
  })
}

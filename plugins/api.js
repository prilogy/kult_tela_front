import Api from '~/services/Api'

export default (ctx, inject) => {
  const api = new Api(ctx)
  ctx.$api = api
  inject('api', api)
}

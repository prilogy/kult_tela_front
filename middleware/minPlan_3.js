export default function({ store, redirect }) {
  const currentPlan = store.getters['user/GET_USER'].plan_id
  if (currentPlan < 3) {
    store.dispatch('popup/SET_ERROR', 'Нет доступа при текущем плане')
    return redirect('/')
  }
}

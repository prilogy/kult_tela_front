export default function({ store, redirect }) {
  const currentPlan = store.getters['user/GET_USER'].plan_id
  if (currentPlan < 1) {
    store.dispatch('popup/SET_ERROR', 'Нет доступа при текущем пакете')
    return redirect('/')
  }
}

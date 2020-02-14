export default function({ store, redirect }) {
  const sub = !!store.state.user.user.is_subscription
  if (!sub) {
    store.dispatch('popup/SET_ERROR', 'Нет доступа, срок подписки истёк')
    return redirect('/')
  }
}

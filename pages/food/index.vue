<script>
export default {
  middleware({ store, redirect }) {
    const currentPlan = store.getters['user/GET_USER'].plan_id
    if (currentPlan < 1) {
      return redirect('/food/tips')
    } else {
      return redirect('/food/personal')
    }
  }
}
</script>

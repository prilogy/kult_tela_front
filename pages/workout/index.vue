<script>
export default {
  middleware({ store, redirect }) {
    const currentPlan = store.getters['user/GET_USER'].plan_id
    if (currentPlan < 1) {
      return redirect('/workout/all')
    } else {
      return redirect('/workout/personal')
    }
  }
}
</script>

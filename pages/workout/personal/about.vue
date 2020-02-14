<template>
  <div>
    <VPageHeading button level="3">О персональной программе</VPageHeading>
    <VP class="desc" v-text="WORKOUT_DESC"></VP>
  </div>
</template>

<script>
export default {
  middleware: ['requireSub', 'minPlan_1'],
  computed: {
    WORKOUT_DESC() {
      const type = this.$store.state.workout.workout_type
      return this.$store.getters['workout/GET_WORKOUT'][type].description
    }
  },
  async fetch({ store, redirect }) {
    const user = store.getters['user/GET_USER']
    if (
      typeof user.workout.overweight_level !== 'number' ||
      typeof user.workout.physical_level !== 'number'
    )
      redirect('/workout/fill-info')
    else {
      if (!store.getters['workout/GET_WORKOUT']) {
        try {
          await store.dispatch('workout/FEED_WORKOUT')
        } catch (e) {
          redirect('/workout')
        }
      }
    }
  }
}
</script>
<style scoped>
.desc {
  white-space: pre-line;
  line-height: 1.3;
  color: var(--grey-light3);
  word-break: break-word;
}
</style>

<template>
  <div v-if="exercise">
    <div>
      <VIcon @click="back" icon="back" />
      <VH3>{{ exercise.name }}</VH3>
    </div>
  </div>
</template>

<script>
import { VPlanCard, VInput, VIcon } from '../../../components/'
import { mapGetters } from 'vuex'

export default {
  middleware: 'minPlan_1',
  components: { VIcon, VInput, VPlanCard },
  data() {
    return {
      exercise: null
    }
  },
  computed: {
    ...mapGetters({
      EXERCISE: 'workout/GET_EXERCISE_FROM_WORKOUT'
    })
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  async created() {
    const id = this.$route.params.id
    let exercise = this.EXERCISE(id)
    if (exercise === null) {
      const { data: exercise } = await this.$api.Exercise.getById(id)
      this.exercise = exercise
    } else this.exercise = exercise
  }
}
</script>

<style scoped></style>

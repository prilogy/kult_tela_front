<template>
  <div v-if="exercise">
    <div>
      <VIcon @click="back" icon="back" />
      <VH3>{{ exercise.name }}</VH3>
    </div>
  </div>
</template>

<script>
import {
  VH1,
  VH2,
  VH3,
  VPlanCard,
  VInput,
  VP,
  VIcon,
  VButton
} from '../../../components/'
import { mapGetters } from 'vuex'

export default {
  middleware: 'minPlan_1',
  components: { VButton, VIcon, VH2, VP, VInput, VPlanCard, VH1, VH3 },
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

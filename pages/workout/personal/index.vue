<template>
  <div class="workout" v-if="WORKOUT">
    <VPageHeading div-inside button>
      <div class="workout__top">
        <VH3>Тренировка</VH3>
        <VH3>День {{ WORKOUT.day_number }}</VH3>
      </div>
    </VPageHeading>

    <AboutLink></AboutLink>
    <VTipSmall mt="var(--space-half)" mb="var(--space-half)">
      <VP color="var(--grey-light3)">
        Не забывайте про правильное распределение нагрузки и ваши ограничения по
        здоровью
      </VP>
    </VTipSmall>
    <div>
      <div class="workout__title">
        <VH3>Упражнения</VH3>
        <div>
          <div
            @click="setWType('home')"
            v-if="WORKOUT.home"
            :class="WORKOUT_TYPE === 'home' ? '' : 'svg--disabled'"
          >
            <svg
              width="24"
              height="23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.503 11.312L12.6.252A.845.845 0 0012 0a.835.835 0 00-.599.252L.498 11.312c-.318.322-.498.76-.498 1.217 0 .948.76 1.72 1.694 1.72h1.15v7.891c0 .476.378.86.846.86h6.616v-6.019h2.965V23h7.04a.853.853 0 00.847-.86v-7.892h1.149c.45 0 .881-.18 1.199-.505a1.74 1.74 0 00-.003-2.431z"
                fill="#EFF721"
              />
            </svg>
          </div>
          <div
            @click="setWType('gym')"
            v-if="WORKOUT.gym"
            :class="WORKOUT_TYPE === 'gym' ? '' : 'svg--disabled'"
          >
            <svg
              width="23"
              height="23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.263 20.642a.463.463 0 01-.023.651l-1 .935a.46.46 0 01-.649-.024l-5.818-6.27a.463.463 0 01.023-.652l1-.933a.458.458 0 01.65.024l5.817 6.269zm7.424-11.799a.463.463 0 01-.023.651L9.375 15.37a.46.46 0 01-.649-.024l-1.5-1.62a.463.463 0 01.023-.65L13.536 7.2a.458.458 0 01.648.023l1.503 1.62zm-5.285 9.8a.464.464 0 01-.023.65l-1 .935a.458.458 0 01-.65-.024l-5.815-6.27a.463.463 0 01.023-.652l.998-.933a.46.46 0 01.65.023l5.817 6.27zm9.69-9.575a.463.463 0 01-.025.651l-1 .934a.46.46 0 01-.65-.023l-5.816-6.27a.463.463 0 01.023-.65l1.003-.937a.458.458 0 01.649.024l5.815 6.271zm2.135-1.996a.464.464 0 01-.023.651l-.998.934a.458.458 0 01-.649-.023l-5.815-6.272a.464.464 0 01.023-.652l.999-.935a.46.46 0 01.648.023l5.815 6.274z"
                fill="#EFF721"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VInput, VButton, VTipSmall } from '../../../components/'
import { mapGetters } from 'vuex'
import AboutLink from '../../../components/pages/workout/pesonal/AboutLink'

export default {
  middleware: 'minPlan_1',
  components: { VTipSmall, VButton, VInput, AboutLink },
  data() {
    return {
      type: false
    }
  },
  computed: {
    EXERCISES() {
      const type = this.WORKOUT_TYPE
      return this.WORKOUT[type].exercises
    },
    WORKOUT_TYPE() {
      return this.$store.state.workout.workout_type
    },
    ...mapGetters({
      WORKOUT: 'workout/GET_WORKOUT'
    })
  },
  methods: {
    setWType(type) {
      if (type !== this.WORKOUT_TYPE) {
        this.$store.dispatch('workout/SET_WORKOUT_TYPE', type)
      }
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
.workout {
}
.workout__top {
  display: flex;
  justify-content: space-between;
}

.workout__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.workout__title > div {
  display: flex;
}
.workout__title > div > div:last-child {
  margin-left: var(--space);
}

.workout__title > div > div {
  cursor: pointer;
}

.svg--disabled {
  opacity: 0.25;
}
</style>

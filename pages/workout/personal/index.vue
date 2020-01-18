<template>
  <div>
    <VH2>Тренировка</VH2>
    <div v-if="WORKOUT != null" class="workout">
      <VH3 class="workout__name">{{ WORKOUT.name }}</VH3>
      <VP class="workout__desc">{{ WORKOUT.description }}</VP>
      <div class="workout__body">
        <div class="workout__body__top">
          <VH2>Упражнения</VH2>
          <div>
            <div @click="type = false">
              <svg
                width="30"
                height="28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.578 13.781L15.706.92a.998.998 0 00-1.412 0L1.422 13.78a2.002 2.002 0 001.412 3.416h1.357v9.178c0 .553.446 1 1 1H13v-7h3.5v7h8.31c.553 0 1-.447 1-1v-9.178h1.356a2.002 2.002 0 001.412-3.416z"
                  :fill="
                    type === false ? 'var(--yellow-base)' : 'var(--grey-light2)'
                  "
                />
              </svg>
            </div>

            <div @click="type = true">
              <svg
                width="28"
                height="28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.059 25.13a.564.564 0 01-.028.792L8.814 27.06a.56.56 0 01-.79-.029L.941 19.397a.564.564 0 01.028-.793l1.218-1.135a.56.56 0 01.79.028l7.082 7.632zm9.038-14.365a.564.564 0 01-.029.793l-7.655 7.152a.56.56 0 01-.79-.029l-1.827-1.972a.564.564 0 01.028-.793l7.654-7.15a.558.558 0 01.79.028l1.83 1.971zm-6.434 11.93a.564.564 0 01-.028.793l-1.218 1.137a.56.56 0 01-.79-.029l-7.08-7.634a.564.564 0 01.028-.793l1.216-1.136a.56.56 0 01.79.029l7.082 7.633zM24.46 11.04a.564.564 0 01-.03.793l-1.217 1.137a.56.56 0 01-.79-.028L15.34 5.309a.563.563 0 01.028-.793l1.22-1.14a.558.558 0 01.79.029l7.08 7.634zm2.6-2.43a.565.565 0 01-.028.793l-1.216 1.137a.559.559 0 01-.79-.028l-7.079-7.636a.565.565 0 01.028-.793L19.191.943a.557.557 0 01.789.028l7.08 7.638z"
                  :fill="
                    type === true ? 'var(--yellow-base)' : 'var(--grey-light2)'
                  "
                />
              </svg>
            </div>
          </div>
        </div>
        <ul class="workout__body__list">
          <li
            @click="$router.push('/workout/' + item.id)"
            class="workout__body__list__item list__item"
            v-for="item in exercises"
            :key="item.id"
          >
            <div class="list__item__icon">
              <div v-if="item.done === false || !item.done">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6"
                    cy="6"
                    r="6"
                    fill="var(--grey-light3)"
                    fill-opacity="0.7"
                  />
                </svg>
              </div>
              <div v-else>
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.99999 11.2L1.79999 7L0.399994 8.4L5.99999 14L18 2L16.6 0.599998L5.99999 11.2Z"
                    fill="#EFF721"
                  />
                </svg>
              </div>
            </div>
            <VP :color="item.done === true ? 'var(--yellow-base)' : ''">
              {{ item.name }}
            </VP>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { VInput, VButton } from '../../../components/'
import { mapGetters } from 'vuex'

export default {
  middleware: 'minPlan_1',
  components: { VButton, VInput },
  data() {
    return {
      type: false
    }
  },
  computed: {
    exercises() {
      return this.type === false
        ? this.WORKOUT.exercises_home
        : this.WORKOUT.exercises_gym
    },
    ...mapGetters({
      WORKOUT: 'workout/GET_WORKOUT'
    })
  },
  methods: {},
  async asyncData({ store, redirect }) {
    if (store.getters['workout/GET_WORKOUT'] === null)
      await store.dispatch('workout/SET_WORKOUT_BY_ID', 1)
    if (store.getters['workout/GET_WORKOUT'] === null) redirect('/workout/all')
  }
}
</script>

<style scoped>
.workout__name {
  color: var(--white-base);
  margin-bottom: var(--space-half);
}

.workout__desc {
  color: var(--grey-light3);
  margin-bottom: var(--space);
}

.workout__body {
}

.workout__body__top {
  margin-bottom: var(--space-half);
  display: flex;
  justify-content: space-between;
}

.workout__body__top > div {
  display: flex;
  align-items: center;
}
.workout__body__top > div > div:first-child {
  margin-right: var(--space);
}

.list__item {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-half);
}
.list__item__icon {
  margin-right: var(--space-half);
}
</style>

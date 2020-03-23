<template>
  <div class="workout" v-if="WORKOUT">
    <div v-if="EXERCISES">
      <VPageHeading div-inside button>
        <div class="workout__top">
          <VH3>Тренировка</VH3>
          <VH3>День {{ WORKOUT.day_number }}</VH3>
        </div>
      </VPageHeading>

      <AboutLink></AboutLink>
      <VTipSmall mt="var(--space-half)" mb="var(--space-half)">
        <VP color="var(--grey-light3)">
          Не забывайте про правильное распределениe нагрузки и ваши
          <span
            @click="$router.push('/workout/tips/health')"
            style="color: yellow; cursor: pointer"
          >
            ограничения по здоровью.
          </span>
          Похудение – очень бережный процесс. Не спешите с нагрузками!
          {{
            $store.getters['user/GET_USER'].workout.physical_level > 1
              ? 'Тренировки - в зале.'
              : ''
          }}
        </VP>
      </VTipSmall>
      <div>
        <div class="workout__title">
          <VH3>Упражнения</VH3>
          <div>
            <div
              class="workout__title__type"
              @click="setWType('home')"
              v-if="WORKOUT.home"
              :class="WORKOUT_TYPE === 'home' ? '' : 'svg--disabled'"
            >
              <VP color="var(--yellow-base)">Дома</VP>
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
              class="workout__title__type"
              @click="setWType('gym')"
              v-if="WORKOUT.gym"
              :class="WORKOUT_TYPE === 'gym' ? '' : 'svg--disabled'"
            >
              <VP v-if="WORKOUT.home">В зале</VP>
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
        <div>
          <ul class="workout__exercises">
            <li
              :class="{
                workout__exercises__item: true,
                'workout__exercises__item--opened': index === openedItem
              }"
              v-for="(item, index) in EXERCISES"
            >
              <div
                class="workout__exercises__item__top"
                @click="
                  setOpenedItem(
                    item.description || item.exercise_id ? index : null
                  )
                "
              >
                <VP>{{ item.name }}</VP>
                <div
                  v-show="item.description || item.exercise_id"
                  :class="{
                    workout__exercises__item__svg: true,
                    'workout__exercises__item__svg--opened':
                      index === openedItem
                  }"
                >
                  <svg
                    width="20"
                    height="10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.52 0L0 1.525 8.5 10 17 1.517 15.48 0 8.5 6.967 1.52 0z"
                      fill="var(--white-base)"
                    />
                  </svg>
                </div>
              </div>

              <VDivider></VDivider>

              <div
                v-if="index === openedItem && item.exercise_id"
                :class="{
                  exercise__watch: true,
                  'exercise__watch--no-pb': item.description
                }"
                @click="goToExercise(item.exercise_id)"
              >
                <svg
                  width="22"
                  height="15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2.143V.856a.837.837 0 00-.257-.606.88.88 0 00-.622-.25H.881A.9.9 0 00.26.25.856.856 0 000 .856v1.287h2.2v2.143H0v2.143h2.2V8.57H0v2.143h2.2v2.143H0v1.285a.838.838 0 00.258.607A.881.881 0 00.88 15h20.24a.9.9 0 00.622-.252.857.857 0 00.257-.606v-1.285h-2.2v-2.143H22V8.571h-2.2V6.43H22V4.286h-2.2V2.143H22zM8.8 10.714V4.286L14.3 7.5l-5.5 3.214z"
                    fill="var(--yellow-base)"
                  />
                </svg>
                <VP>Смотреть видео</VP>
              </div>
              <VP
                class="workout__exercises__item__desc"
                v-if="index === openedItem && item.description"
              >
                {{ item.description }}
              </VP>
            </li>
          </ul>
        </div>
      </div>
      <VTipSmall mt="var(--space-half)" mb="var(--space-half)">
        <VP color="var(--grey-light3)">
          Понедельник, среда и пятница - тренировка, остальные дни - вольно!
        </VP>
      </VTipSmall>
      <VTipSmall
        v-if="$store.getters['user/GET_USER'].workout.physical_level > 1"
        mt="var(--space-half)"
        mb="var(--space-half)"
      >
        <VP color="var(--grey-light3)">
          Если у вас нет возможности тренироваться в зале, напишите в
          <nuxt-link to="/support">
            <span style="color: var(--yellow-base)">
              техническую поддержку.
            </span>
          </nuxt-link>
        </VP>
      </VTipSmall>
    </div>
    <WorkoutDayOff v-else-if="WORKOUT.day_off"></WorkoutDayOff>
    <WorkoutPlanDone v-else-if="WORKOUT.plan_done"></WorkoutPlanDone>
  </div>
</template>

<script>
import { VDivider, VTipSmall } from '../../../components/'
import { mapGetters } from 'vuex'
import {
  AboutLink,
  WorkoutDayOff,
  WorkoutPlanDone
} from '../../../components/pages/workout/pesonal/'

export default {
  middleware: ['requireSub', 'minPlan_1'],
  components: {
    VDivider,
    VTipSmall,
    AboutLink,
    WorkoutDayOff,
    WorkoutPlanDone
  },
  data() {
    return {
      type: false,
      openedItem: null
    }
  },
  computed: {
    EXERCISES() {
      const type = this.WORKOUT_TYPE
      if (this.WORKOUT && !this.WORKOUT.plan_done && !this.WORKOUT.day_off) {
        return this.WORKOUT[type] ? this.WORKOUT[type].exercises : null
      } else return null
    },
    WORKOUT_TYPE() {
      return this.$store.state.workout.workout_type
    },
    ...mapGetters({
      WORKOUT: 'workout/GET_WORKOUT'
    })
  },
  created() {
    if (this.EXERCISES === null) this.setWType('gym')
  },
  methods: {
    setOpenedItem(id) {
      if (id === this.openedItem) this.openedItem = null
      else this.openedItem = id
    },
    setWType(type) {
      this.openedItem = null
      if (type !== this.WORKOUT_TYPE) {
        this.$store.dispatch('workout/SET_WORKOUT_TYPE', type)
      }
    },
    goToExercise(id) {
      this.$router.push('/workout/exercise/' + id)
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
  margin-bottom: var(--space);
}

.workout__title__type {
  display: flex;
  align-items: center;
}

.workout__title__type p {
  color: var(--yellow-base);
  margin-right: var(--space-third);
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

.workout__exercises__item {
  margin-top: var(--space-half);
}

.workout__exercises__item p {
  font-weight: 300;
  margin-bottom: var(--space-half);
}

.workout__exercises__item--opened {
  padding: var(--space-half) var(--space-half) 0 var(--space-half);
  background: var(--white-trans4);
  border-radius: var(--radius-half);
  margin-left: calc(-1 * var(--space-half));
  margin-right: calc(-1 * var(--space-half));
}

.workout__exercises__item__desc {
  padding: var(--space-third) 0;
  color: var(--grey-light3);
}

.workout__exercises__item__svg {
  width: 20px !important;
  margin-left: var(--space-half);
}

.workout__exercises__item__svg--opened svg {
  transform: rotate(180deg);
}

.workout__exercises__item__top {
  display: flex;
  justify-content: space-between;
}

.exercise__watch {
  display: flex;
  align-items: center;
  padding: var(--space-third) 0;
  cursor: pointer;
}

.exercise__watch--no-pb {
  padding-bottom: 0;
}

.exercise__watch p {
  margin: 0 0 0 var(--space-half);
  color: var(--yellow-base);
}

.svg--disabled {
  opacity: 0.25;
}
</style>

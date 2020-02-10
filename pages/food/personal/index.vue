<template>
  <div class="food">
    <div v-if="parts">
      <VPageHeading>
        Ваше питание
        <template v-slot:info>
          Ваше персональное меню питания, подобранное нашими экспертами.
          <br />
          Меню обновляется каждый день.
        </template>
      </VPageHeading>
      <div class="food__body">
        <div>
          <VH2 class="food__top">Продукты</VH2>
          <ul
            :class="{ food__list: true, 'food__list--opened': part.isOpened }"
            v-for="(part, index) in parts"
            :key="part.name"
          >
            <div class="food__list__top" @click="setOpened(index)">
              <VH3>{{ part.name }}</VH3>
              <svg
                width="13"
                height="7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :style="part.isOpened ? 'transform: rotate(-180deg)' : ''"
              >
                <path
                  d="M12.564 0H.436C.072 0-.131.343.094.578l6.064 6.287a.5.5 0 00.684 0L12.906.578C13.13.343 12.928 0 12.564 0z"
                  :fill="
                    part.isOpened ? 'var(--yellow-base)' : 'var(--grey-light2)'
                  "
                ></path>
              </svg>
            </div>
            <transition name="showup--reversed">
              <div v-if="part.isOpened">
                <li class="food__list__item" v-for="item in part.list">
                  <VP>{{ item.name }}</VP>
                  <VP>{{ item.value }}</VP>
                </li>
              </div>
            </transition>
          </ul>
        </div>
        <div>
          <VTipSmall>
            <VP color="var(--grey-light3)">
              Обязательно прочитайте
              <n-link to="/food/tips">
                <span style="color: var(--yellow-base)">
                  советы по питанию
                </span>
              </n-link>
            </VP>
          </VTipSmall>
        </div>
        <div class="food__body__info">
          <VH2>Пищевая ценность</VH2>
          <ul class="food__body__info__list">
            <li v-for="item in FOOD_MENU.info">
              <VP>{{ item.name }}</VP>
              <VP>{{ item.value }}</VP>
            </li>
          </ul>
        </div>
        <nuxt-link to="/food/personal/report">
          <VButton w100>Отправить отчет</VButton>
        </nuxt-link>
      </div>
    </div>
    <div v-else>
      <VH3 class="food__warning">
        Меню питания на подходе!
      </VH3>
    </div>
  </div>
</template>

<script>
import { VTipSmall } from '../../../components'
import { mapGetters } from 'vuex'

export default {
  middleware: 'minPlan_1',
  components: {
    VTipSmall
  },
  data() {
    return {
      parts: null
    }
  },
  methods: {
    setOpened(index) {
      this.parts[index].isOpened = !this.parts[index].isOpened
    },
    setOpenedBasedOnHours() {
      const hour = new Date().getHours()
      if (hour >= 7 && hour < 12) this.setOpened(0)
      else if (hour >= 11 && hour < 17) this.setOpened(1)
      else if (hour >= 17 && hour < 23) this.setOpened(2)
    }
  },
  created() {
    const menu = this.FOOD_MENU
    if (menu && menu.breakfast && menu.breakfast.products) {
      const { breakfast, lunch, dinner, snack } = menu
      this.parts = [
        { name: 'Завтрак', list: breakfast.products, isOpened: false },
        { name: 'Обед', list: lunch.products, isOpened: false },
        { name: 'Ужин', list: dinner.products, isOpened: false },
        { name: 'Перекус', list: snack.products, isOpened: false }
      ]
      this.setOpenedBasedOnHours()
    } else this.parts = null
  },
  computed: {
    ...mapGetters({
      FOOD_MENU: 'food/GET_FOOD_MENU'
    })
  },
  async asyncData({ store, redirect }) {
    if (store.getters['food/GET_FOOD_MENU'] === null) {
      await store.dispatch('food/SET_FOOD_MENU')
    }
    if (store.getters['food/GET_FOOD_MENU'] === null) redirect('/')
  }
}
</script>

<style scoped>
.food__warning {
  color: var(--grey-light3) !important;
  text-align: center;
  font-weight: 400;
}

.food__top {
  margin-bottom: var(--space-half);
}

.food__top h2 {
  margin-bottom: var(--space-third);
}

.food__top__desc {
  color: var(--grey-light3) !important;
}

.food__body {
  margin-bottom: var(--space);
}

.food__body > div {
  margin-bottom: var(--space);
}

.food__list {
  padding: 0 var(--space);
  padding-left: var(--space-half);
  margin-bottom: var(--space-half);
}

.food__list--opened {
  padding: var(--space);
  border-radius: var(--radius);
  background: var(--grey-light1);
}

.food__list__top {
  margin-bottom: var(--space-half);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.food__body__info__list {
  max-width: 500px;
  margin-top: var(--space-half);
}

.food__body__info .food__body__info__list li {
  display: flex;
  justify-content: space-between;
  padding: var(--space-half);
  border-radius: var(--radius-half);
}

.food__body__info .food__body__info__list li:nth-child(odd) {
  background: var(--grey-light1);
}

.food__body__info .food__body__info__list li p:last-child {
  color: var(--yellow-base);
}

.food__list__top h3 {
  color: var(--grey-light3) !important;
}

.food__list--opened .food__list__top h3 {
  color: var(--yellow-base) !important;
}

.food__list__item {
  margin-bottom: var(--space-third);
  margin-left: var(--space-half);
  display: flex;
}

.food__list__item p:first-child {
  color: var(--white-base) !important;
  font-weight: 300;
}
.food__list__item p:last-child {
  color: var(--yellow-base) !important;
  margin-left: var(--space-half);
}
</style>

<template>
  <div>
    <VPageHeading button level="3">Меню на следующие дни</VPageHeading>
    <div>
      <div></div>
      <VPageHeading level="2">Завтра</VPageHeading>
      <ul
        :class="{ food__list: true, 'food__list--opened': part.isOpened }"
        v-for="(part, index) in menus.offset_1"
        :key="part.name"
      >
        <div class="food__list__top" @click="toggleOpened(index)">
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

      <VPageHeading level="2">Послезавтра</VPageHeading>
      <ul
        :class="{ food__list: true, 'food__list--opened': part.isOpened }"
        v-for="(part, index) in menus.offset_2"
        :key="part.name"
      >
        <div class="food__list__top" @click="toggleOpened(index, true)">
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
  </div>
</template>

<script>
export default {
  middleware: ['requireSub', 'minPlan_1'],
  data() {
    return {
      menus: null
    }
  },
  methods: {
    toggleOpened(index, second = false) {
      if (this.menus) {
        if (second === false) {
          this.menus.offset_1[index].isOpened = !this.menus.offset_1[index]
            .isOpened
        } else {
          this.menus.offset_2[index].isOpened = !this.menus.offset_2[index]
            .isOpened
        }
      }
    }
  },
  async asyncData(ctx) {
    try {
      const { data: menu } = await ctx.app.$api.Food.getNext()
      let menus = {}
      if (menu) {
        if (menu.offset_1) {
          let { breakfast, lunch, dinner, snack } = menu.offset_1
          menus.offset_1 = [
            { name: 'Завтрак', list: breakfast.products, isOpened: false },
            { name: 'Обед', list: lunch.products, isOpened: false },
            { name: 'Ужин', list: dinner.products, isOpened: false },
            { name: 'Перекус', list: snack.products, isOpened: false }
          ]
        }
        if (menu.offset_2) {
          let { breakfast, lunch, dinner, snack } = menu.offset_2

          menus.offset_2 = [
            { name: 'Завтрак', list: breakfast.products, isOpened: false },
            { name: 'Обед', list: lunch.products, isOpened: false },
            { name: 'Ужин', list: dinner.products, isOpened: false },
            { name: 'Перекус', list: snack.products, isOpened: false }
          ]
        }
      }
      return {
        menus
      }
    } catch (e) {}
  }
}
</script>

<style>
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

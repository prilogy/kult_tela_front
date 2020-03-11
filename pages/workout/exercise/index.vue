<template>
  <div>
    <VPageHeading button>
      Все упражнения
      <template v-slot:info>
        Перед выполнением любого упражнения прочтите
        <nuxt-link to="/workout/tips">
          <span style="color: var(--yellow-base)">
            советы по тренировкам
          </span>
        </nuxt-link>
        <VTipSmall style="margin-top: var(--space-half)">
          Программа тренировок доступна, начиная с пакета "Артиллерия"
        </VTipSmall>
      </template>
    </VPageHeading>
    <div class="body">
      <div style="display: flex">
        <VInput
          style="width: 100%"
          v-model="search_input"
          class="body__search-input"
          placeholder="Поиск по названию"
        ></VInput>
        <VButton ml="var(--space-half)">Найти</VButton>
      </div>

      <ul v-if="ALL_EXERCISES.length > 0">
        <li
          class="titles__item"
          v-for="(item, index) in ALL_EXERCISES"
          :key="item.id"
        >
          <VH3
            class="titles__item__alphabet-char"
            v-if="
              index === 0 || item.title[0] !== ALL_EXERCISES[index - 1].title[0]
            "
          >
            {{ item.title[0] }}
          </VH3>
          <nuxt-link :to="'/workout/exercise/' + item.id">
            <VP class="titles__item__title" color="var(--grey-light3)">
              {{ item.title }}
            </VP>
          </nuxt-link>
        </li>
      </ul>
      <VP
        mt="var(--space)"
        color="var(--grey-light2)"
        style="text-align: center"
        v-else
      >
        Упражнений не найдено
      </VP>
    </div>
  </div>
</template>

<script>
import { VPlanCard, VInput, VIcon, VTipSmall } from '../../../components/'
import { mapGetters } from 'vuex'

export default {
  middleware: 'requireSub',
  components: {
    VIcon,
    VInput,
    VPlanCard,
    VTipSmall
  },
  data() {
    return {
      search_input: ''
    }
  },
  computed: {
    ALL_EXERCISES() {
      if (!this.search_input)
        return this.$store.getters['workout/GET_ALL_EXERCISES']
      else
        return this.$store.getters['workout/GET_ALL_EXERCISES'].filter(
          item =>
            item.title
              .toLowerCase()
              .indexOf(this.search_input.toLowerCase().trim()) !== -1
        )
    }
  },
  async fetch({ store, redirect }) {
    const exercises = store.getters['workout/GET_ALL_EXERCISES']
    if (!exercises || exercises.length < 10) {
      try {
        await store.dispatch('workout/FEED_ALL_EXERCISES')
      } catch (e) {
        redirect('/workout')
      }
    }
  }
}
</script>

<style scoped>
.body {
  margin-top: var(--space-half);
}

.body .body__search-input >>> input {
  background: var(--grey-light1) !important;
}
.body .body__search-input >>> input:focus {
  background: var(--yellow-trans3) !important;
}

.body .titles__item > .titles__item__alphabet-char {
  margin-top: var(--space-half);
  margin-bottom: 3px;
}

.body .titles__item p {
  padding: var(--space-half) var(--space) var(--space-half) var(--space);
  margin: 0 calc(-1 * var(--space));
}

.body .titles__item:nth-child(odd) p {
  background: var(--white-trans4);
}

.body .titles__item:active p,
.body .titles__item:focus p {
  background: var(--yellow-trans3);
}

.body .titles__item__title {
  font-size: 20px;
}
</style>

<template>
  <div class="tips">
    <VPageHeading button>
      Советы по питанию
      <template v-slot:info>
        В этом разделе вы можете найти советы для безопасного похудения,
        составленные нашими экспертами. Для вашего удобства советы разделены на
        категории ниже.
      </template>
    </VPageHeading>

    <ul class="list">
      <li
        :class="{
          list__item: true,
          'list__item--disabled': item.minPlan && item.minPlan > CURRENT_PLAN
        }"
        v-for="item in cats"
        :key="item.id"
        @click="goTo(item)"
      >
        <VH3>{{ item.title }}</VH3>
      </li>
    </ul>
    <VTipSmall>
      <VP color="var(--grey-light3)">
        Для просмотра - нажмите по названию пункта
      </VP>
    </VTipSmall>
  </div>
</template>

<script>
import VTipSmall from '../../../components/ui/VTipSmall'

export default {
  middleware: 'requireSub',
  components: { VTipSmall },
  data() {
    return {
      categories: [
        {
          id: 0,
          title: 'Введение по персональному меню',
          url: '/intro',
          minPlan: 1
        },
        {
          id: 1,
          title: 'Основы питания',
          url: '/nutrients'
        },
        {
          id: 2,
          title: 'Советы от диетолога',
          url: '/videos'
        },
        {
          id: 3,
          title: 'Советы генерала похудения',
          url: '/videos/30',
          minPlan: 1
        },
        {
          id: 4,
          title: 'Помощник похудения',
          url: '/kilolight'
        }
      ]
    }
  },
  methods: {
    goTo(item) {
      if (item.minPlan && item.minPlan > this.CURRENT_PLAN) {
        this.$store.dispatch('popup/SET_LOCKED', true)
      } else this.$router.push('/food/tips' + item.url)
    }
  },
  computed: {
    cats() {
      return this.categories.sort((a, b) => a.id >= b.id ? 1 : -1)
    },
    CURRENT_PLAN() {
      return this.$store.state.user.user.plan_id
    }
  }
}
</script>

<style scoped>
.list {
  margin-bottom: var(--space);
}

.list__item {
  padding: var(--space-third);
  cursor: pointer;
  border-radius: var(--radius-half);
}

.list__item:hover,
.list__item:active,
.list__item:focus {
  background: var(--white-trans4);
}

.list__item--disabled {
  cursor: default;
}

.list__item--disabled >>> h3 {
  color: var(--grey-light2) !important;
}

.list__item--disabled:hover,
.list__item--disabled:active,
.list__item--disabled:focus {
  background: unset;
}
</style>

<template>
  <div>
    <VPageHeading button level="3">
      Советы от диетолога
      <template v-slot:info>
        Ниже представлены видео-советы от диетолога Черниенковой Арины,
        подготовленные специально для вас
      </template>
    </VPageHeading>
    <div class="body">
      <ul v-if="ACCESSED_VIDEOS">
        <li
          class="item"
          v-for="(item, index) in ACCESSED_VIDEOS"
          :key="item.id"
        >
          <nuxt-link :to="'/food/tips/videos/' + item.id">
            <VH3 class="titles__item__title" color="var(--grey-light3)">
              {{ item.title }}
            </VH3>
          </nuxt-link>
        </li>
      </ul>
      <div class="no-access" v-if="NOT_ACCESSED_VIDEOS.length > 0">
        <VDivider></VDivider>
        <VCaption>Советы, доступные только с плана "Артиллерия"</VCaption>
        <ul v-if="ACCESSED_VIDEOS">
          <li
            class="item"
            v-for="(item, index) in NOT_ACCESSED_VIDEOS"
            :key="item.id"
          >
            <VH3 class="titles__item__title" color="var(--grey-light3)">
              {{ item.title }}
            </VH3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { VTipSmall } from '../../../../components/'
import VDivider from '../../../../components/ui/VDivider'

export default {
  middleware: 'requireSub',
  components: {
    VDivider,
    VTipSmall
  },
  computed: {
    ACCESSED_VIDEOS() {
      return this.$store.getters['food/GET_TIPS_VIDEOS'].filter(e => e.url)
    },
    NOT_ACCESSED_VIDEOS() {
      return this.$store.getters['food/GET_TIPS_VIDEOS'].filter(e => !e.url)
    }
  },
  async fetch({ store }) {
    if (!store.getters['food/GET_TIPS_VIDEOS'])
      await store.dispatch('food/FEED_TIPS_VIDEOS')
  }
}
</script>

<style scoped>
.item {
  padding: var(--space-half);
  cursor: pointer;
  border-radius: var(--radius-half);
}
.item:hover,
.item:active,
.item:focus {
  background: var(--white-trans4);
}

.item h3 {
  color: var(--yellow-base) !important;
  font-size: 20px;
}

.no-access p {
  padding: var(--space-third) 0;
  color: var(--grey-light3);
  text-align: center;
}

.no-access .item h3 {
  color: var(--grey-light2) !important;
}
.no-access .item:hover,
.no-access .item:active,
.no-access .item:focus {
  background: none;
  cursor: default;
}
</style>

<template>
  <div class="top">
    <VH1 mb="var(--space)">Лучшие солдаты</VH1>
    <div>
      <div class="top__row" v-for="(user, index) in top" :key="user.id">
        <VH3 weight="regular" :color="getColor(index)">
          {{ `#${index + 1} ${user.first_name} ${user.last_name}` }}
        </VH3>
        <VH3 :color="getColor(index)">
          {{
            `${user.weight_start}кг > ${user.weight_start - user.weight_diff}кг`
          }}
        </VH3>
      </div>
    </div>
  </div>
</template>

<script>
import { VH1, VH3, VP, VAvatar, VButton } from '../components/'
export default {
  components: {
    VH3,
    VH1
  },
  data() {
    return {
      top: null
    }
  },
  methods: {
    getColor(index) {
      if (index === 0) return 'var(--yellow-base)'
      else if (index === 1) return '#EEEEEE'
      else if (index === 2) return '#C9812C'
      else return 'var(--grey-light3)'
    }
  },
  async asyncData(ctx) {
    const { data } = await ctx.app.$api.Top.current()

    return {
      top: data.top
    }
  }
}
</script>

<style scoped>
.top {
}
.top__row {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-third);
}
</style>

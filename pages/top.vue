<template>
  <div class="top">
    <VH1 mb="var(--space)">Лучшие солдаты</VH1>
    <div class="top__switch">
      <VButton clearstyle @click="toggleSwitch(false)">
        <VH3
          :color="!topSwitch ? 'var(--yellow-base)' : 'var(--grey-light3)'"
          weight="regular"
        >
          Последний месяц
        </VH3>
      </VButton>
      <VButton clearstyle @click="toggleSwitch(true)">
        <VH3
          :color="topSwitch ? 'var(--yellow-base)' : 'var(--grey-light3)'"
          weight="regular"
        >
          Всё время
        </VH3>
      </VButton>
    </div>

    <div v-if="currentTop && currentTop.length !== 0">
      <div class="top__row" v-for="(user, index) in currentTop" :key="user.id">
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
    <div v-else>
      <VH3
        weight="regular"
        color="var(--grey-light3)"
        style="text-align: center"
      >
        {{ currentTop === null ? 'Топ загружается...' : 'Армия на подходе!' }}
      </VH3>
    </div>
  </div>
</template>

<script>
import { VH1, VH3, VH2, VP, VAvatar, VButton } from '../components/'
export default {
  components: {
    VButton,
    VH2,
    VH3,
    VH1
  },
  data() {
    return {
      topSwitch: false,
      top: {
        lastMonth: null,
        allTime: null
      }
    }
  },
  computed: {
    currentTop() {
      return this.topSwitch ? this.top.allTime : this.top.lastMonth
    }
  },
  methods: {
    async toggleSwitch(value) {
      if (value === true && this.top.allTime === null) {
        const { data } = await this.$api.Top.allTime()
        this.top.allTime = data.top
      }
      this.topSwitch = value
    },
    getColor(index) {
      if (index === 0) return 'var(--yellow-base)'
      else if (index === 1) return '#EEEEEE'
      else if (index === 2) return '#C9812C'
      else return 'var(--grey-light3)'
    }
  },
  async asyncData(ctx) {
    const { data } = await ctx.app.$api.Top.lastMonth()

    return {
      top: { lastMonth: data.top, allTime: null }
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
.top__switch {
  margin-bottom: var(--space-half);
  display: flex;
  justify-content: space-between;
}
</style>

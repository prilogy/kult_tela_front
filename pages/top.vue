<template>
  <div class="top">
    <VPageHeading button to="/">
      Лучшие офицеры
      <template v-slot:info>
        Расчет на основе % похудения
        <VTipSmall mt="var(--space-half)">Скоро введение призов за результат похудения</VTipSmall>
      </template>
    </VPageHeading>
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
      <div class="top_avatars">
        <div class="top_avatars__first" v-if="currentTop[0]">
          <TopItem :user="currentTop[0]" place="1"></TopItem>
        </div>
        <div class="top_avatars__23">
          <TopItem
            v-if="currentTop[1]"
            :user="currentTop[1]"
            place="2"
          ></TopItem>
          <TopItem
            v-if="currentTop[2]"
            :user="currentTop[2]"
            place="3"
          ></TopItem>
        </div>
        <div class="top_avatars__10" v-if="topSwitch">
          <TopItem
            v-if="user"
            @click="goTo(user)"
            :user="user"
            v-for="(user, idx) in currentTop.slice(3, 11)"
            :key="user.id"
            :place="idx + 4"
          ></TopItem>
        </div>
      </div>
      <div
        @click="goTo(user)"
        class="top__row"
        v-for="(user, index) in currentTop.slice(topSwitch ? 11 : 3)"
        :key="user.id"
      >
        <VH3 weight="regular">
          {{
          `#${index + (topSwitch ? 12 : 4)} ${user.last_name +
          ' ' +
          user.first_name}`
          }}
        </VH3>
        <VH3>-{{ Math.round(user.weight_diff) }}кг</VH3>
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
  import VTipSmall from '../components/ui/VTipSmall'
  import VAvatar from '../components/ui/VAvatar'
  import TopItem from '../components/pages/top/TopItem'

  export default {
    components: { TopItem, VAvatar, VTipSmall },
    middleware: 'requireSub',
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
      goTo(user) {
        this.$router.push('/user/' + user.id)
      },
      async toggleSwitch(value) {
        if (value === true && this.top.allTime === null) {
          const { data } = await this.$api.Top.allTime()
          this.top.allTime = data.top
        }
        this.topSwitch = value
      }
    },
    async asyncData(ctx) {
      try {
        const { data } = await ctx.app.$api.Top.lastMonth()
        return {
          top: { lastMonth: data.top, allTime: null }
        }
      } catch (e) {
        ctx.redirect('/')
      }
    }
  }
</script>

<style scoped>
  .top {
  }

  .top_avatars {
    margin: var(--space) 0 var(--space-half) 0;
  }

  .top_avatars__first {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .top_avatars__23 {
    width: 100%;
    display: flex;
    justify-content: space-around;
    max-width: 400px;
    margin: var(--space-half) auto 0 auto;
  }

  .top_avatars__10 {
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .top__row {
    display: flex;
    padding: var(--space-third);
    border-radius: var(--radius-half);
    justify-content: space-between;
    cursor: pointer;
  }

  .top__row h3 {
    color: var(--grey-light3);
  }

  .top__row:hover,
  .top__row:active,
  .top__row:focus {
    background: var(--white-trans4);
  }

  .top__switch {
    margin-bottom: var(--space-half);
    display: flex;
    justify-content: space-between;
  }
</style>

<template>
  <div>
    <div v-if="!afterPayment">
      <VPageHeading button>
        Продление подписки
        <template v-slot:info>
          Выберите пакет, на который вы хотите продлить подписку и нажмите на
          кнопку "Перейти к оплате"
        </template>
      </VPageHeading>
      <div class="plans" v-if="plans">
        <VPlanCard
          @btnClick="handleClick(plan)"
          v-for="plan in plans"
          v-if="!plan.disabled"
          :key="plan.id"
          :plan="plan"
          :isSelected="selectedPlan === plan"
          :btnText="{ default: 'Выбрать', selected: 'Выбрано' }"
        ></VPlanCard>
      </div>
      <VButton
        @click="extend"
        :disabled="selectedPlan === null"
        w100
        mt="var(--space-half)"
      >
        {{ selectedPlan && selectedPlan.trial ? 'Получить бесплатно' : 'Перейти к оплате' }}
      </VButton>
    </div>
    <div v-else class="after-payment">
      <div>
        <VP>После оплаты перезагрузите эту страницу</VP>
        <VButton @click="reload">Перезагрузить</VButton>
      </div>
    </div>
  </div>
</template>

<script>
import { VPlanCard } from '../../components/'
export default {
  components: { VPlanCard },
  middleware({ store, redirect }) {
    const sub = !!store.state.user.user.is_subscription
    if (sub) {
      return redirect('/')
    }
  },
  data() {
    return {
      selectedPlan: null,
      afterPayment: false
    }
  },
  methods: {
    reload() {
      location.reload()
    },
    async extend() {
      const plan_id = this.selectedPlan.id
      try {
        const r = await this.$api.Subscription.extend({ plan_id })
        console.log(r)
        if (r.data && r.data.url) window.open(r.data.url, '_self')
        else {
          await this.$router.push('/', () => {
            this.$router.go(0)
          })
        }
        this.afterPayment = true
      } catch (e) {}
    },
    handleClick(plan) {
      this.selectedPlan = plan
    }
  },
  async asyncData(ctx) {
    try {
      let { data: plans } = await ctx.app.$api.Plans.getAll()

      if(ctx.app.store.state.user.user.plan_id === 0)
        plans = plans.map(e => {
          if(typeof e.trial === 'number') {
            delete e.newCost
          }
          return e
        })
      else plans = plans.map(e => {
        if(e.trial)
          delete e.trial
        return e
      })

      return {
        plans
      }
    } catch (e) {
      ctx.redirect('/')
    }
  }
}
</script>

<style scoped>
.plans div {
  margin-bottom: var(--space-half);
}

.plan--opened {
}

.plans > div:last-child {
  margin-bottom: 0;
}

.after-payment {
  display: flex;
  height: 100vh;
}

.after-payment > div p {
  color: var(--yellow-base);
  margin-bottom: var(--space-half);
}

.after-payment > div {
  text-align: center;
  margin: auto;
}
</style>

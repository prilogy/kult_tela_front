<template>
  <div>
    <div v-if="!afterPayment">
      <VPageHeading button>
        Продление подписки
        <template v-slot:info>
          Выберите план, на который вы хотите продлить подписку и нажмите на
          кнопку "Перейти к оплате"
        </template>
      </VPageHeading>
      <div class="plans" v-if="plans">
        <VPlanCard
          @btnClick="handleClick(plan)"
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
          :isSelected="selectedPlan === plan"
          btnText="Выбрать"
        ></VPlanCard>
      </div>
      <VButton
        @click="extend"
        :disabled="selectedPlan === null"
        w100
        mt="var(--space-half)"
      >
        Перейти к оплате
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
      console.log(plan_id)
      try {
        const data = await this.$api.Subscription.extend({ plan_id })
        this.afterPayment = true
      } catch (e) {}
    },
    handleClick(plan) {
      this.selectedPlan = plan
    }
  },
  async asyncData(ctx) {
    try {
      const { data: plans } = await ctx.app.$api.Plans.getAll()
      return { plans }
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

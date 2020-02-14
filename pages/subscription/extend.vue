<template>
  <div>
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
</template>

<script>
import { VPlanCard } from '../../components/'
export default {
  components: { VPlanCard },
  data() {
    return {
      selectedPlan: null
    }
  },
  methods: {
    async extend() {
      const plan_id = this.selectedPlan.id
      console.log(plan_id)
      try {
        const data = await this.$api.Subscription.extend({ plan_id })
        if (data.success === true) this.$router.push('/')
      } catch (e) {}
    },
    handleClick(plan) {
      this.selectedPlan = plan
    }
  },
  async asyncData(ctx) {
    try {
      const { data: plans } = await ctx.app.$api.Plans.getAll()
      console.log(plans)
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
</style>

<template>
  <div>
    <transition name="showup--reversed">
      <div v-if="planToBuy">
        <VPlanCard
          btnText="Выбрать другой"
          @btnClick="planToBuy = null"
          class="plan--opened"
          :plan="planToBuy"
        ></VPlanCard>
      </div>
    </transition>
    <transition name="showup">
      <div v-if="!planToBuy">
        <VH1 mb="var(--space)">Доступные планы</VH1>
        <div class="plans" v-if="plans">
          <VPlanCard
            @btnClick="handleBuy"
            v-for="plan in plans"
            :key="plan.id"
            :plan="plan"
          ></VPlanCard>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { VH1, VPlanCard } from '../components/'
export default {
  layout: 'noNav',
  components: { VPlanCard, VH1 },
  data() {
    return {
      plans: null,
      planToBuy: null
    }
  },
  methods: {
    handleBuy(id) {
      const plan = this.plans.filter(plan => plan.id === id)[0]
      this.planToBuy = plan
    }
  },
  async created() {
    const { data: plans } = await this.$api.Plans.getAll()
    this.plans = plans
  }
}
</script>

<style scoped>
.plans > div {
  margin-bottom: var(--space);
}

.plan--opened {
}

.plans > div:last-child {
  margin-bottom: 0;
}
</style>

<template>
  <div>
    <div v-if="planToBuy">
      <VPlanCard class="plan--opened" :plan="planToBuy"></VPlanCard>
    </div>
    <div>
      <VH1 mb="var(--space)">Доступные планы</VH1>
      <div class="plans" v-if="plans">
        <VPlanCard
          @buy="handleBuy"
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
        ></VPlanCard>
      </div>
    </div>
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
      console.log(id)
    }
  },
  async created() {
    const { data: plans } = await this.$api.Plans.getAll()
    this.plans = plans
    console.log(plans)
  }
}
</script>

<style scoped>
.plans > div {
  margin-bottom: var(--space);
}

.plan--opened {
  position: fixed;
  top: var(--space);
  right: var(--space);
  left: var(--space);
}

.plans > div:last-child {
  margin-bottom: 0;
}
</style>

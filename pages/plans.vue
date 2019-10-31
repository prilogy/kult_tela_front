<template>
  <div>
    <transition name="showup--reversed">
      <div v-if="planToBuy" class="buy-form">
        <VPlanCard
          btnText="Выбрать другой"
          @btnClick="planToBuy = null"
          class="plan--opened"
          :plan="planToBuy"
        ></VPlanCard>

        <VP my="var(--space-half)">
          Введите email, на который после оплаты будут отправлены дальнейшие
          инструкции по регистрации
        </VP>
        <form id="buy-form" @submit.prevent="proceedToBuy">
          <VInput
            type="email"
            required
            placeholder="example@email.ru"
            caption="Email"
            v-model="email"
          ></VInput>
          <VButton type="submit" form="buy-form" value="submit" w100>
            Перейти к оплате
          </VButton>
        </form>
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
import { VH1, VPlanCard, VInput, VP, VButton } from '../components/'

export default {
  layout: 'noNav',
  components: { VButton, VP, VInput, VPlanCard, VH1 },
  data() {
    return {
      plans: null,
      planToBuy: null,
      email: ''
    }
  },
  methods: {
    handleBuy(id) {
      this.planToBuy = this.plans.filter(plan => plan.id === id)[0]
    },
    async proceedToBuy() {
      const data = {
        email: this.email,
        plan_id: this.planToBuy.id
      }
      try {
        const result = await this.$api.Auth.createBlankProfile(data)
        //redirect to y.kassa
        this.$router.push('/login')
      } catch (error) {
        this.email = ''
      }
    }
  },
  async asyncData(ctx) {
    const { data: plans } = await ctx.app.$api.Plans.getAll()
    return { plans }
  }
}
</script>

<style scoped>
.buy-form > p {
  margin: var(--space-half) 0;
}

.buy-form form > div {
  margin-bottom: var(--space-half);
}

.plans div {
  margin-bottom: var(--space);
}

.plan--opened {
}

.plans > div:last-child {
  margin-bottom: 0;
}
</style>

<template>
  <div>
    <transition name="showup--reversed">
      <div v-if="planToBuy" class="buy-form">
        <VPlanCard
          btnText="Изменить"
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
        <div class="top">
          <VIcon @click="back" icon="back" />
          <VH2>Доступные планы</VH2>
        </div>

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
import { VH2, VPlanCard, VInput, VP, VButton } from '../components/'
import VIcon from '../components/utils/VIcon'

export default {
  layout: 'noNav',
  components: { VIcon, VButton, VP, VInput, VPlanCard, VH2 },
  data() {
    return {
      plans: null,
      planToBuy: null,
      email: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
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
    console.log(ctx)
    try {
      const { data: plans } = await ctx.app.$api.Plans.getAll()
      return { plans }
    } catch (e) {
      ctx.redirect('/login')
    }
  }
}
</script>

<style scoped>
.top {
  display: flex;
  margin-bottom: var(--space);
  align-items: baseline;
}
.top img {
  margin-right: var(--space);
}

.buy-form > p {
  margin: var(--space-half) 0;
}

.buy-form form > div {
  margin-bottom: var(--space-half);
}

.plans div {
  margin-bottom: var(--space-half);
}

.plan--opened {
}

.plans > div:last-child {
  margin-bottom: 0;
}
</style>

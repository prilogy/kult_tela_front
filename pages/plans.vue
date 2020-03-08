<template>
  <div>
    <div v-if="!afterSubmit">
      <transition name="showup--reversed">
        <div v-if="planToBuy" class="buy-form">
          <VPlanCard
            :btnText="{ default: 'Изменить', selected: 'Изменить' }"
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
          <VPageHeading button>
            Доступные пакеты
            <template v-slot:info>
              <VTipSmall>
                Срок службы - 1 месяц
              </VTipSmall>
            </template>
          </VPageHeading>

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
    <div class="after-submit popup" v-else-if="afterSubmit">
      <VP>
        На указанную почту отправлено письмо с дальнейшими инструкциями по
        регистрации
      </VP>
      <nuxt-link to="/login">
        <VButton>К форме входа</VButton>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { VPlanCard, VInput, VButtonBack, VTipSmall } from '../components/'

export default {
  layout: 'noNav',
  components: { VTipSmall, VButtonBack, VInput, VPlanCard },
  data() {
    return {
      plans: null,
      planToBuy: null,
      email: '',
      afterSubmit: false
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
        window.open(result.data.url)
        this.afterSubmit = true
      } catch (error) {
        this.email = ''
      }
    }
  },
  async asyncData(ctx) {
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
.popup {
  max-width: var(--body-max-width);
  background: var(--grey-base);
  position: fixed;
  padding: var(--space);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: fit-content;
  margin: auto;
}

.after-submit {
  text-align: center;
  margin: auto;
}

.after-submit p {
  color: var(--yellow-base);
  margin-bottom: var(--space-half);
}

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

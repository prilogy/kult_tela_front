<template>
  <div>
    <div v-if="!afterSubmit">
      <transition name="showup--reversed">
        <div v-if="planToBuy" class="buy-form">
          <VPlanCard
            :btnText="{ default: 'Изменить', selected: 'Изменить' }"
            @btnClick="getBack"
            class="plan--opened"
            :inList="false"
            :plan="planToBuy"
            :isFree="code && codeIsValid"
          ></VPlanCard>

          <VP my="var(--space-half)">
            Введите email, на который будут отправлены дальнейшие
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
            <VButton
              :disabled="!email"
              type="submit"
              form="buy-form"
              value="submit"
              w100
            >
              {{ code && codeIsValid ? 'Подтвердить' : typeof planToBuy.trial === 'number' ? 'Получить бесплатно' : 'Перейти к оплате' }}
            </VButton>
            <VP class="warning-text">
              Приложение сделано профессионалами, но носит рекомендательный
              характер. Вы сами несёте ответственность за свое здоровье и жизнь.
            </VP>
          </form>
        </div>
      </transition>
      <transition name="showup">
        <div v-if="!planToBuy">
          <VPageHeading button to="/login">
            Доступные пакеты
            <template v-slot:info>
              <VTipSmall>
                Срок службы - 1 месяц
              </VTipSmall>
            </template>
          </VPageHeading>

          <div class="promo">
            <VInput
              v-model="code"
              style="width: 100%"
              placeholder="Ввести промокод"
            />
            <VButton :disabled="!code" @click="verifyPromo">Ввод</VButton>
          </div>

          <div class="plans" v-if="plans">
            <VPlanCard
              @btnClick="handleBuy"
              v-for="plan in plans"
              :key="plan.id"
              :plan="plan"
              v-if="!plan.disabled"
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
import { VPlanCard, VInput, VTipSmall } from '../components/'

export default {
  layout: 'noNav',
  components: { VTipSmall, VInput, VPlanCard },
  data() {
    return {
      code: null,
      codeIsValid: false,
      plans: null,
      planToBuy: null,
      email: '',
      afterSubmit: false
    }
  },
  methods: {
    getBack() {
      this.code = null
      this.codeIsValid = false
      this.planToBuy = null
    },
    async verifyPromo() {
      if (this.code) {
        try {
          const r = await this.$api.Promo.verify({ code: this.code })
          if (typeof r.data.plan_id === 'number') {
            this.codeIsValid = true
            this.handleBuy(r.data.plan_id, true)
          }
        } catch (e) {
          this.code = null
          this.codeIsValid = false
        }
      }
    },
    back() {
      this.$router.back()
    },
    handleBuy(id, promo = false) {
      if (promo === false) {
        this.code = null
        this.codeIsValid = false
      }
      this.planToBuy = this.plans.filter(plan => plan.id === id)[0]
    },
    async proceedToBuy() {
      let data = {
        email: this.email,
        plan_id: this.planToBuy.id
      }

      if (this.code && this.codeIsValid) {
        data.code = this.code
      }

      try {
        const result = await this.$api.Auth.createBlankProfile(data)
        if (result.data.url) window.open(result.data.url)
        this.afterSubmit = true
      } catch (error) {
        this.email = ''
      }
    }
  },
  async asyncData(ctx) {
    const id = ctx.query.p ? parseInt(ctx.query.p) : null
    try {
      const { data: plans } = await ctx.app.$api.Plans.getAll()
      let toReturn = { plans }
      if (typeof id === 'number') {
        const planToBuy = plans.filter(plan => plan.id === id)[0]
        if (!planToBuy.locked_message) toReturn.planToBuy = planToBuy
      }
      return toReturn
    } catch (e) {
      ctx.redirect('/login')
    }
  }
}
</script>

<style scoped>
.promo {
  display: flex;
  margin-bottom: var(--space-half);
}

.promo button {
  margin-left: var(--space-half);
}

.warning-text {
  font-weight: 300;
  color: var(--grey-light3);
  margin-top: var(--space-half);
  text-align: center;
}
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

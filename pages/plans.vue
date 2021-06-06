<template>
  <div>
    <div v-if="!afterSubmit">
      <transition name="showup--reversed">
        <div v-if="planToBuy" class="buy-form">
          <VPlanCard
            :btnText="{ default: 'Изменить', selected: 'Изменить' }"
            @btnClick="getBack"
            class="plan--opened"
            :type="planToBuyType"
            :inList="false"
            :plan="planToBuy"
            :isFree="code && codeIsValid"
          ></VPlanCard>

          <VP my="var(--space-half)">
            Введите номер телефона, на который будет отправлен код подтверждения
          </VP>
          <form id="buy-form" @submit.prevent="proceedToBuy">
            <!--            <VInput-->
            <!--              type="email"-->
            <!--              required-->
            <!--              placeholder="example@email.ru"-->
            <!--              caption="Email"-->
            <!--              v-model="email"-->
            <!--            ></VInput>-->
            <vue-phone-number-input
              v-model="phone_number"
              :translations="{
                countrySelectorLabel: 'Код страны',
                countrySelectorError: 'Ошибка выбора кода',
                phoneNumberLabel: 'Телефонный номер',
                example: 'Пример: '
              }"
              :only-countries="['RU']"
              color="#9A9C2E"
              :dark="true"
            ></vue-phone-number-input>
            <VButton
              :disabled="!phoneIsValid"
              type="submit"
              form="buy-form"
              value="submit"
              w100
            >
              {{ code && codeIsValid ? 'Подтвердить' : typeof planToBuy.trial === 'number' && planToBuyType === 'trial' ? 'Получить бесплатно' : 'Перейти к оплате'
              }}
            </VButton>
            <div style="display: flex; margin: var(--space-half) 0; justify-content: center; align-items: center">
              <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 0L5.6 13.633 2 10.9H0L5.6 20 20 0h-2z" fill="var(--yellow-base)" />
              </svg>
              <VP ml="var(--space-third)" color="var(--yellow-base)" weight="300">Даю согласие на получение СМС уведомлений</VP>
            </div>
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
        Для продолжения введите код из смс, который мы отправили на номер <span
        style="white-space: nowrap">{{ phone_number }}</span>
      </VP>
      <div class="promo">
        <VInput
          v-model="proceedCode"
          style="width: 100%"
          placeholder="112233"
        />
        <VButton :disabled="!proceedCode || proceedCode.length !== 6" @click="proceedNext">Продолжить</VButton>
      </div>
    </div>

    <!--    <div class="after-submit popup" v-else-if="afterSubmit">-->
    <!--      <VP>-->
    <!--        На указанную почту отправлено письмо с дальнейшими инструкциями по-->
    <!--        регистрации. Если письмо не пришло, то проверьте папку “Спам”.-->
    <!--      </VP>-->
    <!--      <nuxt-link to="/login">-->
    <!--        <VButton>К форме входа</VButton>-->
    <!--      </nuxt-link>-->
    <!--    </div>-->
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
      planToBuyType: null,
      email: '',
      phone_number: '',
      afterSubmit: false,
      proceedCode: null
    }
  },
  computed: {
    phoneIsValid() {
      return ((this.phone_number || '').match(/\d/g) || []).length === 10
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
    handleBuy({ id, type }, promo = false) {
      if (promo === false) {
        this.code = null
        this.codeIsValid = false
      }
      this.planToBuyType = type
      this.planToBuy = this.plans.filter(plan => plan.id === id)[0]
    },
    async proceedToBuy() {
      let data = {
        // email: this.email,
        plan_id: this.planToBuy.id,
        phone_number: this.phone_number
      }

      if (this.code && this.codeIsValid) {
        data.code = this.code
      }

      try {
        const result = await this.$api.Auth.createBlankProfile(data, this.planToBuyType === 'buy')
        if (result.data.url) window.open(result.data.url)
        this.afterSubmit = true
      } catch (error) {
        this.email = ''
      }
    },
    async proceedNext() {
      try {
        const r = await this.$api.Auth.verifyCode({ code: this.proceedCode })
        const hash = r.data.hash || null
        await this.$router.push('/first-login/' + hash)
      } catch (e) {

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

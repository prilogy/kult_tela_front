<template>
  <div>
    <VPageHeading button>
      Смена пакета
      <template v-slot:info>
        Мы возвращаем деньги за остаток месяца.
        <br/>
        Изменить данные физподготовки и лишнего веса вы сможете только в конце
        месяца службы или написав в тех поддержку.
        <VTipSmall mt="var(--space-third)">
          Для продолжения выберите интересующий вас пакет и перейдите к оплате
          по нажатию кнопки внизу страницы.
        </VTipSmall>
      </template>
    </VPageHeading>

    <div class="plans" v-if="plans">
      <VPlanCard
        @btnClick="handleSelect(plan)"
        v-for="plan in plans"
        :key="plan.id"
        :plan="plan"
        :current="typeof plan.newCost !== 'number' && !plan.trial"
        :btnText="{ default: 'Выбрать', selected: 'Выбрано' }"
        :isSelected="selectedPlan && plan.id === selectedPlan.id"
      ></VPlanCard>
    </div>
    <VButton id="payment-btn" @click="proceedToPayment" :disabled="!selectedPlan" w100>
      {{ selectedPlan && selectedPlan.trial ? 'Получить бесплатно' : 'Перейти к оплате'}}
    </VButton>
  </div>
</template>
<script>
  import { VTipSmall, VPlanCard } from '../../components'
  import scrollTo from "../../mixins/scrollTo"

  export default {
    mixins: [scrollTo],
    middleware: ['requireSub'],
    components: { VPlanCard, VTipSmall },
    data() {
      return {
        selectedPlan: null
      }
    },
    methods: {
      handleSelect(plan) {
        this.selectedPlan = plan
        this.scrollTo('#payment-btn', 300)
      },
      async proceedToPayment() {
        if (this.selectedPlan) {
          const data = {
            new_plan_id: this.selectedPlan.id
          }
          try {
            const result = await this.$api.Plans.changePlan(data)
            console.log(result)
            if(result.data && result.data.url)
              window.open(result.data.url, '_self')
            else {
              await this.$router.push('/', () => {
                this.$router.go(0)
              })
            }
          } catch (error) {
            await this.$store.dispatch(
              'popup/SET_ERROR',
              'Ошибка при создании платежа. Попробуйте позднее.'
            )
            this.selectedPlan = null
          }
        }
      }
    },
    async asyncData(ctx) {
      try {
        let { data: plans } = await ctx.app.$api.Plans.getChangePrices()
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
        return { plans }
      } catch (e) {
        ctx.redirect('/')
      }
    }
  }
</script>

<style scoped>
  .plans {
  }

  .plans > div {
    margin-bottom: var(--space-half);
  }
</style>

<template>
  <div>
    <VPageHeading button to="/login">
      Сброс пароля
      <template v-slot:info v-if="!submited">
        Для сброса пароля введите номер телефона, который вы указывали при регистрации и
        нажмите на кнопку ниже
      </template>
    </VPageHeading>
    <div v-if="!submited">
      <form ref="resetForm" id="reset-form" @submit.prevent="resetPassword">
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
          form="reset-form"
          value="submit"
          mt="var(--space-half)"
          w100
        >
          Сбросить пароль
        </VButton>
      </form>
    </div>
    <div v-else>
      <VP>
        Для продолжения введите код из смс, который мы отправили на номер <span
        style="white-space: nowrap">{{ phone_number }}</span>
      </VP>
      <div class="promo">
        <VInput
          mt="var(--space-half)"
          v-model="proceedCode"
          style="width: 100%"
          placeholder="112233"
        />
        <VButton mt="var(--space-half)" :disabled="!proceedCode || proceedCode.length !== 6" @click="proceedNext">Продолжить</VButton>
      </div>
    </div>
  </div>
</template>

<script>
import { VInput } from '../../components'

export default {
  components: { VInput },
  layout: 'noNav',
  data() {
    return {
      phone_number: '',
      submited: false,
      validate: false,
      proceedCode: null
    }
  },
  computed: {
    phoneIsValid() {
      return ((this.phone_number || '').match(/\d/g) || []).length === 10
    }
  },
  methods: {
    async resetPassword() {
      try {
        await this.$api.Password.request({ phone_number: this.phone_number })
        this.submited = true
      } catch (e) {
      }
    },
    async proceedNext() {
      try {
        const r = await this.$api.Auth.verifyCode({ code: this.proceedCode })
        const hash = r.data.hash || null
        await this.$router.push('/reset-password/' + hash)
      }
      catch (e) {

      }
    }
  },
  async asyncData(ctx) {
    try {
    } catch (e) {
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>

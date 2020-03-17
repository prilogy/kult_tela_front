<template>
  <div>
    <VPageHeading button to="/login">
      Сброс пароля
      <template v-slot:info v-if="!submited">
        Для сброса пароля введить email, который вы указывали при регистрации и
        нажмите на кнопку ниже
      </template>
    </VPageHeading>
    <div v-if="!submited">
      <form ref="resetForm" id="reset-form" @submit.prevent="resetPassword">
        <VInput
          v-model="email"
          required
          type="email"
          caption="Email"
          placeholder="Ваш email..."
        ></VInput>
        <VButton
          :disabled="!validate"
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
      <VH3>Инструкции по сбросу пароля отправлены на указанный email</VH3>
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
      email: '',
      submited: false,
      validate: false
    }
  },
  watch: {
    email() {
      this.validate = Boolean(
        this.email.match(
          /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g
        )
      )
    }
  },
  methods: {
    async resetPassword() {
      try {
        await this.$api.Password.request({ email: this.email })
        this.submited = true
      } catch (e) {}
    }
  },
  async asyncData(ctx) {
    try {
    } catch (e) {}
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>

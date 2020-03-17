<template>
  <div>
    <VPageHeading button to="/login">
      Сброс пароля
      <template v-slot:info v-if="!submited">
        Введите ваш новый пароль и нажмите кнопку ниже
        <VTipSmall mt="var(--space-half)">
          Минимальная длина пароля - 6 символов
        </VTipSmall>
      </template>
    </VPageHeading>
    <div v-if="!submited">
      <form
        autocomplete="off"
        ref="resetForm"
        id="reset-form"
        @submit.prevent="resetPassword"
      >
        <VInput
          v-model="password"
          required
          type="text"
          caption="Пароль"
          autocomplete="nope"
          placeholder="Ваш новый пароль..."
        ></VInput>
        <VInput
          style="margin-top: var(--space-third)"
          autocomplete="new-password"
          v-model="re_password"
          required
          type="password"
          caption="Подтвердите пароль"
          placeholder="Подтверждение пароля"
        ></VInput>
        <VButton
          :disabled="!validate"
          form="reset-form"
          value="submit"
          mt="var(--space-half)"
          w100
        >
          Подтвердить пароль
        </VButton>
        <VP
          v-if="!validate && (password && re_password)"
          color="var(--red-base)"
          style="text-align: center; margin-top: var(--space-third)"
        >
          Введенные пароли должны совпадать и длиной не менее 5 символов
        </VP>
      </form>
    </div>
    <div v-else>
      <VH3>
        Пароль успешно сброшен, теперь вы можете войти в учетную запись с новым
        паролем!
      </VH3>
      <VButton @click="$router.push('/login')" mt="var(--space-half)" w100>
        К форме входа
      </VButton>
    </div>
  </div>
</template>

<script>
import { VInput } from '../../components'
import VTipSmall from '../../components/ui/VTipSmall'

export default {
  components: { VTipSmall, VInput },
  layout: 'noNav',
  data() {
    return {
      password: '',
      re_password: '',
      submited: false,
      hash: null
    }
  },
  computed: {
    validate() {
      return (
        this.password &&
        this.re_password &&
        this.password === this.re_password &&
        this.password.length > 5 &&
        this.re_password.length > 5
      )
    }
  },
  methods: {
    async resetPassword() {
      if (this.hash && this.validate) {
        try {
          await this.$api.Password.reset({
            hash: this.hash,
            new_password: this.password
          })
          this.submited = true
        } catch (e) {}
      }
    }
  },
  async asyncData(ctx) {
    console.log(ctx)
    try {
      const r = await ctx.app.$api.Password.verify({ hash: ctx.params.hash })
      return { hash: ctx.params.hash }
    } catch (e) {
      ctx.redirect('/login')
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>

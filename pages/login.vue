<template>
  <div class="login-form__wrapper">
    <div class="login-form">
      <div class="login-form__top">
        <VH1>Вход</VH1>
        <div class="login-form__top__button">
          <VH3 weight="regular">или</VH3>
          <nuxt-link to="/plans">
            <VButton weight="regular" pa="var(--space-half)">
              Купить доступ
            </VButton>
          </nuxt-link>
        </div>
      </div>
      <div class="login-form__middle">
        <form id="login-form" @submit.prevent="doLogin">
          <VInput
            type="email"
            autocomplete="email"
            placeholder="Email"
            required
            v-model="login"
          />
          <VInput
            class="login-form__middle__input"
            type="password"
            autocomplete="current-password"
            placeholder="Пароль"
            required
            v-model="password"
          />
        </form>
      </div>
      <div class="login-form__bottom">
        <nuxt-link to="/reset-password">
          <VP class="login-form__bottom__caption">Забыли пароль?</VP>
        </nuxt-link>

        <VButton
          type="submit"
          form="login-form"
          weight="regular"
          pa="var(--space-half)"
          value="submit"
        >
          Войти
        </VButton>
      </div>
      <VP class="warning-text">
        Для корректной работы приложения рекомендуется использовать последниe
        версии браузеров Chrome, Firefox или Opera.
      </VP>
    </div>
  </div>
</template>

<script>
import { VInput } from '../components'
import { mapActions } from 'vuex'

export default {
  layout: 'noNav',
  middleware: 'auth',
  components: {
    VInput
  },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async doLogin(e) {
      const user = {
        email: this.login,
        password: this.password
      }

      await this.LOGIN(user)
    },
    ...mapActions({
      LOGIN: 'auth/LOGIN'
    })
  }
}
</script>

<style scoped>
.warning-text {
  margin-top: var(--space-half);
  text-align: center;
  color: var(--grey-light2);
}
.login-form__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-form {
  width: 100%;
  max-width: 500px;
}
.login-form__top {
  display: flex;
  justify-content: space-between;
}
.login-form__top__button {
  display: flex;
  align-items: center;
}
.login-form__top__button button {
  margin-left: var(--space-half);
}

.login-form__middle {
  margin: var(--space-half) 0;
}

.login-form div:first-child {
  margin-bottom: var(--space-half);
}

.login-form__bottom {
  display: flex;
  justify-content: space-between;
}

.login-form__bottom__caption {
  color: var(--grey-light3);
}

.sds {
}
</style>

<template>
  <div class="login-form__wrapper">
    <div class="login-form">
      <div class="login-form__top">
        <VH1>Вход</VH1>
        <div class="login-form__top__button">
          <VH3 weight="regular">или</VH3>
          <VButton weight="regular" pa="var(--space-half)"
            >Купить доступ</VButton
          >
        </div>
      </div>
      <div class="login-form__middle">
        <form id="login-form" @submit.prevent="doLogin">
          <VInput
            type="text"
            autocomplete="username"
            placeholder="Логин"
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
        <VP class="login-form__bottom__caption">Забыли пароль?</VP>
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
    </div>
  </div>
</template>

<script>
import { VH3, VH1, VButton, VP, VInput } from '../components'
import { mapActions } from 'vuex'

export default {
  layout: 'noNav',
  components: {
    VInput,
    VH3,
    VH1,
    VButton,
    VP
  },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    doLogin(e) {
      const user = {
        email: this.login,
        password: this.password
      }

      this.LOGIN(user)
    },
    ...mapActions({
      LOGIN: 'auth/LOGIN'
    })
  }
}
</script>

<style scoped>
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

.login-form input:first-child {
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

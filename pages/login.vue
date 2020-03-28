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
      <VGuidePopup @close="videoPopup = false" v-if="videoPopup" />
      <div class="online-army" @click="videoPopup = true">
        <VH3>Экскурсия по Онлайн-Армии</VH3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          width="40"
          viewBox="0 0 512 512"
        >
          <path
            fill="var(--grey-base)"
            d="M447 202L277 32a45 45 0 00-69 57v1c-12 62-42 117-86 161l-78 78a45 45 0 000 64l42 42c18 18 46 18 64 0l11-10 74 74a45 45 0 1064-64l-32-32 10-10c18-18 18-46 0-64l-7-7c36-25 76-42 119-51h1c18 12 42 10 57-5 18-18 18-47 0-64zM129 414c-6 6-15 6-21 0l-43-42c-6-6-6-16 0-22l74-74 64 64-74 74zm148 42a15 15 0 01-21 22l-74-75 21-21 74 74zm-53-95l22-21 10 10c6 6 6 16 0 22l-10 10-22-21zm1-42l-65-65c35-40 60-87 73-139l131 131c-52 14-99 38-139 73zm201-75c-6 6-16 6-21 0L235 75a15 15 0 1121-22l170 170c6 6 6 15 0 21z"
          />
          <path
            fill="var(--grey-base)"
            d="M150 329c-6-6-15-6-21 0l-21 21a15 15 0 0021 22l21-22c6-5 6-15 0-21zM346 0c-8 0-15 7-15 15v30a15 15 0 0030 0V15c0-8-7-15-15-15zM466 120h-30a15 15 0 000 30h30a15 15 0 000-30zM447 34c-6-5-16-5-21 0l-30 30a15 15 0 0021 22l30-30c6-6 6-16 0-22z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { VGuidePopup, VInput } from '../components'
import { mapActions } from 'vuex'

export default {
  head: {
      title: 'Home page 🚀',
      meta: [
        { hid: 'description', name: 'description', content: 'Культ тела - проект для похудения дома или в зале. енерал Марина Богомолова похудела на 100 кг за 2 года. Смогла она - сможешь и ты!' },
        { hid: 'keywords', name: 'keywords', content: 'Культ тела, армия похудения, культ тела 4, культ тела личный кабинет, культ тела онлайн армия, онлайн армия, армия безопасного похудения, похудеть в Пенза, Культ тела Пенза' }
      ],
  },
  layout: 'noNav',
  middleware: 'auth',
  components: {
    VGuidePopup,
    VInput
  },
  data() {
    return {
      login: '',
      password: '',
      videoPopup: false
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
.online-army {
  margin: var(--space) calc(-1 * var(--space)) 0 calc(-1 * var(--space));
  padding: var(--space-half) var(--space);
  background: var(--yellow-base);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.online-army h3 {
  color: var(--grey-base);
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

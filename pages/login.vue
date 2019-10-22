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
        <input
          class="login-form__middle__input"
          type="text"
          placeholder="Логин"
        />
        <input
          class="login-form__middle__input"
          type="password"
          placeholder="Пароль"
        />
      </div>
      <div class="login-form__bottom">
        <VP class="login-form__bottom__caption">Забыли пароль?</VP>
        <VButton weight="regular" pa="var(--space-half)">Войти</VButton>
      </div>
    </div>
  </div>
</template>

<script>
import { VH3, VH1, VButton, VP } from '../components';

export default {
  components: {
    VH3,
    VH1,
    VButton,
    VP
  }
};
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

.login-form__middle__input {
  background: var(--grey-light2);
  width: 100%;
  font-size: var(--h3-fs);
  color: var(--grey-light3);
  padding: var(--space-third) var(--space-half);
  box-sizing: border-box;
}

.login-form__middle__input:active,
.login-form__middle__input:focus {
  background: var(--yellow-trans2);
  color: var(--yellow-base);
}

.login-form__middle__input:first-child {
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

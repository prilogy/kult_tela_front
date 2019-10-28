<template>
  <nav class="nav">
    <div class="nav__dropdown" v-if="burgerToggle">
      <VH2 v-for="link in dropdownLinks" :key="link.id">{{ link.name }}</VH2>
      <VPWAPrompt v-if="!isPWAInstalled"></VPWAPrompt>
    </div>

    <div class="nav__icons">
      <n-link v-for="link in links" :key="link.id" to="/">
        <div class="icon"></div>
      </n-link>
      <button @click="burgerToggle = !burgerToggle">
        <svg
          width="35"
          height="35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :fill="burgerToggle ? $ds.colors.yellow.base : $ds.colors.grey.base"
            d="M0 0h35v7H0zM0 14h35v7H0zM0 28h35v7H0z"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
import VH2 from '../typography/VH2';
import VButton from './VButton';
import VPWAPrompt from '../utils/VPWAPrompt';

export default {
  components: { VH2, VButton, VPWAPrompt },
  data() {
    return {
      burgerToggle: false,
      links: [
        { id: 0, name: 'Моё питание', icon: '' },
        { id: 1, name: 'Топ 100', icon: '' },
        { id: 2, name: 'Профиль', icon: '' },
        { id: 3, name: 'Тренировка', icon: '' }
      ],
      dropdownLinks: [
        { id: 0, name: 'Оповещения' },
        { id: 1, name: 'Моё питание' },
        { id: 2, name: 'Калькулятор каллорий' },
        { id: 3, name: 'Связь с поддержкой' },
        { id: 4, name: 'Общий чат' },
        { id: 5, name: 'Выйти из аккаунта' }
      ],
      isPWAInstalled: false
    };
  },
  created() {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    ) {
      this.isPWAInstalled = true;
    }
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: var(--body-max-width);
}

.nav__dropdown {
  animation: dropdown-showup 0.5s;
  background: var(--grey-light1);
  padding: var(--space);
}

@keyframes dropdown-showup {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav__dropdown h2 {
  line-height: 1.4;
  color: var(--white-base);
}

.nav__icons {
  align-items: center;
  display: flex;
  justify-content: space-around;
  background: var(--grey-light2);
  height: var(--navbar-height);
}

.icon {
  width: 35px;
  height: 35px;
  background: var(--grey-base);
}
</style>

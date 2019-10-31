<template>
  <nav class="nav">
    <transition name="showup">
      <div class="nav__dropdown" v-if="burgerToggle">
        <button
          @click="dropDownLinkAction(link)"
          v-for="link in LINKS.dropdownLinks"
          :key="link.id"
        >
          <VH2>{{ link.name }}</VH2>
        </button>

        <!--<VPWAPrompt v-if="!isPWAInstalled"></VPWAPrompt>-->
      </div>
    </transition>
    <div class="nav__icons">
      <n-link v-for="link in LINKS.links" :key="link.id" :to="link.url || ''">
        <div
          @click="hideDropdown"
          :class="{
            nav__icons__icon: true,
            'nav__icons__icon--active': link.id === LINKS.currentLinkId
          }"
        ></div>
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
import VH2 from '../typography/VH2'
import VButton from './VButton'
import VPWAPrompt from '../utils/VPWAPrompt'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { VH2, VButton, VPWAPrompt },
  data() {
    return {
      burgerToggle: false,
      isPWAInstalled: false
    }
  },
  methods: {
    hideDropdown() {
      this.burgerToggle = false
    },
    dropDownLinkAction(link) {
      if (link.action) link.action()
      else if (link.url) this.$router.push(link.url)
      this.hideDropdown()
    },
    ...mapActions({
      LOGOUT: 'auth/LOGOUT'
    })
  },
  computed: {
    ...mapGetters({
      LINKS: 'nav/GET_LINKS'
    })
  },
  created() {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    ) {
      this.isPWAInstalled = true
    }
  }
}
</script>

<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: var(--body-max-width);
}

.nav__dropdown {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--grey-light1);
  padding: var(--space);
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

.nav__icons__icon {
  width: 35px;
  height: 35px;
  background: var(--grey-base);
}
.nav__icons__icon--active {
  background: var(--yellow-base);
}
</style>

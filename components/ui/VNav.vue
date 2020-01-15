<template>
  <nav class="nav">
    <transition name="showup">
      <div class="nav__dropdown" v-if="burgerToggle">
        <button
          class="nav__dropdown__notifications_button"
          @click="dropDownLinkAction({ url: '/notifications' })"
        >
          <VH2>Оповещения</VH2>
          <VH2 color="var(--yellow-base)">
            {{ newNotifications <= 0 ? '' : newNotifications }}
          </VH2>
        </button>
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
        <div @click="hideDropdown">
          <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
            <path
              :d="link.icon"
              :fill="
                link.id === LINKS.currentLinkId
                  ? 'var(--yellow-base)'
                  : 'var(--grey-base)'
              "
            />
          </svg>
        </div>
      </n-link>
      <button class="burger" @click="burgerToggle = !burgerToggle">
        <div class="burger__mark" v-if="newNotifications > 0">
          <p>{{ newNotifications }}</p>
        </div>
        <svg
          width="35"
          height="35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :fill="burgerToggle ? 'var(--yellow-base' : 'var(--grey-base)'"
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
import VCaption from '../typography/VCaption'

export default {
  components: { VCaption, VH2, VButton, VPWAPrompt },
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
    }
  },
  computed: {
    newNotifications() {
      const lastSeenId = this.USER.notifications_last_seen
      const lastId = this.USER.notifications[this.USER.notifications.length - 1]
        .id
      return lastId - lastSeenId
    },
    ...mapGetters({
      LINKS: 'nav/GET_LINKS',
      USER: 'user/GET_USER'
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
  z-index: 100;
  max-width: var(--body-max-width);
}

.nav__dropdown {
  border-radius: var(--radius) var(--radius) 0 0;
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

.nav__dropdown__notifications_button {
  display: flex;
}

.nav__dropdown__notifications_button h2:last-child {
  margin-left: var(--space-half);
}

.burger {
  position: relative;
}

.burger__mark {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  position: absolute;
  background: var(--yellow-base);
  right: -5px;
  width: 20px;
  height: 20px;
  top: -7px;
}

.burger__mark p {
  color: var(--grey-base);
  font-size: 12px;
  font-weight: 600;
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

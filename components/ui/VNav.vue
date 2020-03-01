<template>
  <nav class="nav" ref="nav">
    <transition name="showup">
      <div class="nav__dropdown" v-show="burgerToggle">
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
          class="nav__dropdown__notifications_button messages-btn"
          @click="dropDownLinkAction({ url: '/messages' })"
        >
          <VH2>Сообщения</VH2>
          <span
            v-show="$store.state.chat.isNewMessages"
            class="messages-bullet"
          ></span>
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
      <n-link
        v-for="link in LINKS.links"
        :key="link.id"
        :to="(!link.disabled && link.url) || ''"
      >
        <div
          :class="link.disabled ? 'link--disabled' : ''"
          @click="hideDropdown"
        >
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
        <div
          class="burger__mark"
          v-if="
            $store.state.chat.isNewMessages ||
              (newNotifications && newNotifications > 0)
          "
        >
          <p>
            {{
              (newNotifications && newNotifications) ||
                ($store.state.chat.isNewMessages && 1)
            }}
          </p>
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
    LINKS() {
      let links = this.$store.getters['nav/GET_LINKS']
      if (this.USER.is_subscription === false) {
        links.links = links.links.map((e, index) => {
          if (index === 0) return e
          else return { ...e, disabled: true }
        })
        links.dropdownLinks = links.dropdownLinks.filter(
          e => e.name === 'Выйти из аккаунта'
        )
        return links
      } else return links
    },
    currentRoute() {
      return this.$route.name
    },
    newNotifications() {
      let count = 0
      if (this.USER) {
        const lastSeenId = this.USER.notifications_last_seen
        if (this.USER.notifications) {
          const lastId = this.USER.notifications[
            this.USER.notifications.length - 1
          ].id
          count += lastId - lastSeenId
        }
        return count
      } else return null
    },
    ...mapGetters({
      USER: 'user/GET_USER',
      CHATS: 'chat/GET_CHATS'
    })
  },
  watch: {
    currentRoute() {
      this.hideDropdown()
    }
  },
  created() {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    ) {
      this.isPWAInstalled = true
    }
  },
  mounted() {
    document.addEventListener('click', evt => {
      let flyoutElement = this.$refs.nav,
        targetElement = evt.target // clicked element
      if (this.burgerToggle) {
        do {
          if (targetElement == flyoutElement) {
            return
          }
          targetElement = targetElement.parentNode
        } while (targetElement)
        this.hideDropdown()
      }
    })
  },
  destroyed() {
    document.removeEventListener('click', evt => {})
  }
}
</script>

<style scoped>
.messages-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.messages-bullet {
  width: 15px;
  height: 15px;
  border-radius: 100px;
  background: var(--yellow-base);
  margin-left: var(--space-half);
}

.nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: var(--body-max-width);
  z-index: 100;
}

.nav__dropdown {
  border-radius: var(--radius) var(--radius) 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--grey-light1);
  padding: var(--space);
  z-index: 999;
}

.nav__dropdown h2 {
  line-height: 1.4;
  color: var(--white-base);
  cursor: pointer;
}

.nav__icons {
  align-items: center;
  display: flex;
  justify-content: space-around;
  background: var(--grey-light2);
  height: var(--navbar-height);
  z-index: 1000;
}

.nav__dropdown__notifications_button {
  display: flex;
}

.nav__dropdown__notifications_button h2:last-child {
  margin-left: var(--space-half);
}

.link--disabled {
  opacity: 0.4;
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

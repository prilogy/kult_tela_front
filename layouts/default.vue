<template>
  <div>
    <VNav></VNav>
    <main>
      <nuxt />
    </main>
    <VError></VError>
    <VSuccess></VSuccess>
    <VRankNotification></VRankNotification>
    <VLockedPopup
      :text="typeof lockedPopup === 'string' ? lockedPopup : null"
      v-if="lockedPopup"
    ></VLockedPopup>
    <div class="offset"></div>
  </div>
</template>

<script>
import {
  VNav,
  VFooter,
  VError,
  VSuccess,
  VRankNotification,
  VTutorPopup,
  VLockedPopup
} from '~/components'
import { mapActions } from 'vuex'
import VBrowserPopup from '../components/ui/VBrowserPopup'

export default {
  middleware: 'notAuth',
  components: {
    VBrowserPopup,
    VLockedPopup,
    VSuccess,
    VNav,
    VFooter,
    VError,
    VRankNotification,
    VTutorPopup
  },
  data() {
    return {
      browserPopup: false,
    }
  },
  methods: {
    ...mapActions({
      SET_CURRENT_LINK_ID: 'nav/SET_CURRENT_LINK_ID'
    })
  },
  created() {
    this.SET_CURRENT_LINK_ID()
  },
  computed: {
    lockedPopup() {
      return this.$store.getters['popup/GET_LOCKED']
    }
  },
  watch: {
    $route() {
      this.SET_CURRENT_LINK_ID()
    }
  }
}
</script>

<style scoped>
body {
  background: var(--grey-base);
  max-width: var(--body-max-width);
  margin: 0 auto;
}

.offset {
  height: 50px;
}

main {
  overflow: hidden;
  padding: var(--space);
}
</style>

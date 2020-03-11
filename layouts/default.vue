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
    <VTutorPopup @clicked="tutorPopup = false" v-if="tutorPopup"></VTutorPopup>
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

export default {
  middleware: 'notAuth',
  components: {
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
      tutorPopup: null
    }
  },
  methods: {
    ...mapActions({
      SET_CURRENT_LINK_ID: 'nav/SET_CURRENT_LINK_ID'
    })
  },
  created() {
    this.SET_CURRENT_LINK_ID()
    if (
      this.$store.getters['user/GET_USER'].tutor_id === null &&
      this.$store.getters['user/GET_USER'].plan_id > 2
    )
      this.tutorPopup = true
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

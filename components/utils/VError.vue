<template>
  <transition name="showup">
    <div class="error" v-if="ERROR">
      <VP class="error__text">{{ ERROR }}</VP>
      <VIcon @click="close" class="error__icon" icon="close" />
    </div>
  </transition>
</template>

<script>
import VIcon from './VIcon'
import VP from '../typography/VP'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    VIcon,
    VP
  },
  methods: {
    close() {
      this.SET_ERROR(null)
    },
    ...mapActions({
      SET_ERROR: 'popup/SET_ERROR'
    })
  },
  computed: {
    ...mapGetters({
      ERROR: 'popup/GET_ERROR'
    })
  }
}
</script>

<style scoped>
.error {
  border-radius: var(--radius);
  z-index: 1000;
  background: var(--red-base);
  position: fixed;
  padding: var(--space-half);
  width: 90vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: var(--body-max-width);
  bottom: var(--space-half);
  right: 0;
  box-shadow: 0 0 15px var(--red-base);
  left: 0;
}

.error__text {
  color: var(--white-base);
  font-weight: lighter;
  font-size: 20px;
}

.error__icon {
  margin-left: var(--space);
}
</style>

<template>
  <transition name="showup">
    <div class="error" v-if="ERROR">
      <VP class="error__text">{{ ERROR }}</VP>
    </div>
  </transition>
</template>

<script>
import { VError, VP } from '../'
import { mapGetters } from 'vuex'

export default {
  components: {
    VError,
    VP
  },
  computed: {
    ...mapGetters({
      ERROR: 'error/GET_ERROR'
    })
  }
}
</script>

<style scoped>
.showup-enter-active,
.showup-leave-active {
  transform: translateY(0);
  transition: all 0.5s;
}
.showup-enter,
.showup-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.error {
  background: var(--red-base);
  position: fixed;
  padding: var(--space-half);
  width: 90vw;
  margin: 0 auto;
  bottom: var(--space-half);
  right: 0;
  box-shadow: 0 0 15px var(--red-base);
  left: 0;
}

.error__text {
  color: var(--white-base);
  font-weight: lighter;
  text-align: center;
  font-size: 20px;
}
</style>

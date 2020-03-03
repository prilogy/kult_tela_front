<template>
  <transition name="showup">
    <div class="error" v-if="ERROR">
      <VP class="error__text">{{ ERROR }}</VP>
      <div @click="close">
        <svg
          class="error__icon"
          width="20"
          height="20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 2.326L17.674 0 10 7.674 2.326 0 0 2.326 7.674 10 0 17.674 2.326 20 10 12.326 17.674 20 20 17.674 12.326 10 20 2.326z"
            fill="#fff"
          />
        </svg>
      </div>
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

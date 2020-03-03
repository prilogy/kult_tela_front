<template>
  <transition name="showup">
    <div class="success" v-if="SUCCESS">
      <VP class="success__text">{{ SUCCESS }}</VP>
      <div @click="close">
        <svg
          class="success__icon"
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
import { mapGetters, mapActions } from 'vuex'
import VIcon from './VIcon'
import VP from '../typography/VP'

export default {
  components: {
    VP,
    VIcon
  },
  methods: {
    close() {
      this.SET_SUCCESS(null)
    },
    ...mapActions({
      SET_SUCCESS: 'popup/SET_SUCCESS'
    })
  },
  computed: {
    ...mapGetters({
      SUCCESS: 'popup/GET_SUCCESS'
    })
  }
}
</script>

<style scoped>
.success {
  border-radius: var(--radius);
  z-index: 1000;
  background: var(--green-base);
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-half);
  width: 90vw;
  max-width: var(--body-max-width);
  margin: 0 auto;
  bottom: var(--space-half);
  right: 0;
  box-shadow: 0 0 15px var(--green-base);
  left: 0;
}

.success__text {
  color: var(--white-base);
  font-weight: lighter;
  text-align: center;
  font-size: 20px;
}

.success__icon {
  margin-left: var(--space);
}
</style>

<template>
  <transition name="showup">
    <div class="success" v-if="SUCCESS">
      <VP class="success__text">{{ SUCCESS }}</VP>
      <VIcon @click="close" class="success__icon" icon="close" />
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
  z-index: 101;
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

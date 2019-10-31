<template>
  <transition name="showup">
    <div class="success" v-if="SUCCESS">
      <VP class="success__text">{{ SUCCESS }}</VP>
    </div>
  </transition>
</template>

<script>
import { VP } from '../'
import { mapGetters } from 'vuex'

export default {
  components: {
    VP
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
  background: var(--green-base);
  position: fixed;
  padding: var(--space-half);
  width: 90vw;
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
</style>

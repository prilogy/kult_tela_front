<template>
  <div>
    <div class="bg"></div>
    <transition name="showup">
      <div class="notification" v-show="show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
  }
}
</script>

<style scoped>
.bg {
  z-index: 101;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: var(--grey-trans1);
}
.notification {
  z-index: 102;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: var(--grey-base);
  position: fixed;
  padding: var(--space);
  width: 70vw;
  height: fit-content;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  border-radius: var(--radius);
  max-width: var(--body-max-width);
  border: 2px solid var(--yellow-base);
  box-shadow: 0 0 40px #eff62133;
}
</style>

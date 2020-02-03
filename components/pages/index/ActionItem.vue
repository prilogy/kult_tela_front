<template>
  <div
    class="item"
    :style="{
      background: $ds.withOpacity(action.color, 20),
      border: action.color + ' solid 2px'
    }"
  >
    <nuxt-link :to="action.url" style="text-decoration: none">
      <div class="item__inner">
        <VP :color="action.color" class="actions__grid__item__inner__p">
          {{ action.title }}
        </VP>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['action']
}
</script>

<style scoped>
.item {
  border-radius: var(--radius-half);
  padding: var(--space);
  background: #ffffff26;
  border: solid 2px var(--white-base);
}

.item__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>

<template>
  <div
    @click="$router.push(action.url)"
    class="item"
    :style="{
      background: $ds.withOpacity(action.color, 20),
      border: action.color + ' solid 2px'
    }"
  >
    <div class="item__inner">
      <VP :color="action.color" class="item__inner__p">
        {{ action.title + (action.paid ? ' ₽' : '') }}
      </VP>
    </div>
  </div>
</template>

<script>
export default {
  props: ['action']
}
</script>

<style scoped>
.item {
  position: relative;
  border-radius: var(--radius-half);
  padding: var(--space);
  background: #ffffff26;
  border: solid 2px var(--white-base);
  cursor: pointer;
}
.item:focus,
.item:active,
.item:hover {
  transform: translateY(-2px);
}

.item__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.item__inner__p {
  letter-spacing: 0.5px;
}
</style>

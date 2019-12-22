<template>
  <div class="tip">
    <slot></slot>
  </div>
</template>

<script></script>

<style scoped>
.tip {
  background: var(--grey-light1);
  padding: var(--space-half);
  border-left: solid 3px var(--yellow-base);
  border-radius: 0 var(--radius) var(--radius) 0;
}
</style>

<template>
  <nuxt-link :to="category.url">
    <div :class="{ item: true, 'item--plan-failed': category.planFailed }">
      <span
        :style="{ width: svgWidth + 'px' }"
        class="svg"
        v-html="category.svg"
      ></span>
      <VH3>{{ category.title }}</VH3>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    category: Object,
    svgWidth: {
      type: Number,
      default: 60
    }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  padding: var(--space-half);
  border-radius: var(--radius);
}
.item:hover {
  background: var(--white-trans4);
  cursor: pointer;
}
.item:hover h3 {
  color: var(--yellow-base);
}
.item:hover .svg >>> svg > path {
  fill: var(--yellow-base);
}

.item h3 {
  margin-left: var(--space);
  font-weight: 300;
  color: var(--grey-light3);
}
.svg >>> svg > path {
  fill: var(--grey-light3);
}

.item--plan-failed {
  opacity: 0.7;
  background: var(--white-trans4);
}

.item--plan-failed h3 {
  color: var(--grey-light2);
}
.item--plan-failed .svg >>> svg > path {
  fill: var(--grey-light2);
}
.item--plan-failed:hover {
  background: var(--white-trans4);
  cursor: pointer;
}
.item--plan-failed:hover h3 {
  color: var(--grey-light2);
}
.item--plan-failed:hover .svg >>> svg > path {
  fill: var(--grey-light2);
}
</style>

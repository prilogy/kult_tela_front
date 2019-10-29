<template>
  <div
    class="plan"
    :style="{ borderColor: colors[100], background: colors[25] }"
  >
    <VH2 weight="regular" :color="colors[100]" mb="var(--space-half)">{{
      plan.name
    }}</VH2>
    <VP>{{ plan.description }}</VP>
    <div class="plan__bottom">
      <VH2 weight="regular" :color="colors[100]">
        {{ plan.cost }}&#8381;/сезон
      </VH2>
      <VButton
        class="plan__bottom__button"
        pa="var(--space-third)"
        weight="regular"
        color="var(--white-base)"
        :bg="colors[100]"
        @click="handleButton"
        >Купить план</VButton
      >
    </div>
  </div>
</template>

<script>
import VH2 from '../typography/VH2'
import VP from '../typography/VP'
import VButton from './VButton'
export default {
  components: { VButton, VP, VH2 },
  props: {
    plan: Object
  },
  methods: {
    handleButton() {
      this.$emit('buy', this.plan.id)
    }
  },
  computed: {
    colors() {
      const base = this.plan.color
      return {
        100: base,
        70: base + this.$ds.getHexOpacity(70),
        50: base + this.$ds.getHexOpacity(50),
        25: base + this.$ds.getHexOpacity(25)
      }
    }
  }
}
</script>

<style scoped>
.plan {
  padding: var(--space-half);
  border: 3px solid;
}

.plan__bottom {
  margin-top: var(--space-half);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.plan__bottom__button {
  padding: var(--space-third) var(--space-half);
}
.plan__bottom__button:hover,
.plan__bottom__button:focus,
.plan__bottom__button:active {
  transform: none;
  box-shadow: none;
}
</style>

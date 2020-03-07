<template>
  <div
    :class="{ plan: true, 'plan--selected': isSelected }"
    :style="{ borderColor: colors[100], background: colors[25] }"
  >
    <div v-if="plan.locked_message" class="plan__locked">
      <div :style="{ backgroundColor: colors[100] }" class="plan__locked__item">
        <VH3>{{ plan.locked_message }}</VH3>
      </div>
    </div>
    <VH2 weight="regular" :color="colors[100]" mb="var(--space-half)">
      {{ plan.name }}
    </VH2>
    <VP>{{ plan.description }}</VP>
    <div class="plan__bottom">
      <VH2
        v-if="!current && !plan.newCost"
        weight="regular"
        :color="colors[100]"
      >
        {{ plan.cost }}&#8381;/месяц
      </VH2>
      <div
        style="display: flex; align-items: center"
        v-else-if="!current && typeof plan.newCost === 'number'"
      >
        <VH2 :color="colors[100]">
          {{ plan.newCost }}&#8381;{{
            typeof plan.newCost === 'number' ? '' : '/месяц'
          }}
        </VH2>

        <VH3
          :color="colors[70]"
          style="text-decoration: line-through;margin-left: var(--space-third)"
        >
          {{ plan.cost }}&#8381;
        </VH3>
      </div>
      <VH3 :color="colors[100]" v-else>
        Текущий пакет
      </VH3>
      <VButton
        ml="var(--space-third)"
        v-if="!current && !plan.locked_message"
        :class="{
          plan__bottom__button: true,
          'plan__bottom__button--selected': isSelected
        }"
        pa="var(--space-third)"
        weight="regular"
        color="var(--white-base)"
        :bg="colors[100]"
        @click="handleButton"
      >
        {{ isSelected ? btnText.selected : btnText.default }}
      </VButton>
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
    plan: Object,
    btnText: {
      type: Object,
      default: () => ({
        default: 'Купить пакет',
        selected: 'Изменить'
      })
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    current: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleButton() {
      this.$emit('btnClick', this.plan.id)
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
  border-radius: var(--radius);
  position: relative;
  overflow: hidden;
}

.plan h2 {
  line-height: 1;
}

.plan__locked {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: #00000055;
}

.plan__locked__item {
  background: red;
  text-align: center;
  width: 100%;
  padding: var(--space-half);
}

.plan__locked__item h3 {
  text-shadow: 0 0 30px #00000044;
  color: var(--white-base);
}

.plan--selected {
  border: 2px solid;
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

.plan__bottom__button--selected {
  background: none !important;
}
</style>

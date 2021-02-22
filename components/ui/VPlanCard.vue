<template>
  <div
    :class="{ plan: true, 'plan--selected': isSelected }"
    :style='{ borderColor: colors[100], background: colors[25] }'
  >
    <VH2 weight='regular' :color='colors[100]' mb='var(--space-half)'>
      {{ plan.name }}
    </VH2>
    <VP class="plan__description">{{ plan.description }}</VP>
    <div class='plan__bottom'>
      <VH2
        v-if='!current && !plan.newCost && !plan.locked_message'
        weight='regular'
        :color='colors[100]'
      >
        <span v-if='isFree'>
          Бесплатно
        </span>
        <span v-else-if="typeof plan.trial === 'number'">
          {{ plan.trial }} дней бесплатно
        </span>
        <span v-else>
          {{ plan.cost }}<span
          style="font-family: 'Helvetica Neue', sans-serif !important;">&#8381;</span>/месяц
        </span>
      </VH2>
      <div
        style='display: flex; align-items: center'
        v-else-if="
          !current && typeof plan.newCost === 'number' && !plan.locked_message
        "
      >
        <VH2 :color='colors[100]'>
          {{ plan.newCost }}<span
          style="font-family: 'Helvetica Neue', sans-serif !important;">&#8381;</span>{{
            typeof plan.newCost === 'number' ? '' : '/месяц'
          }}
        </VH2>

        <VH3
          v-if='plan.cost'
          :color='colors[70]'
          style='text-decoration: line-through;margin-left: var(--space-third)'
        >
          {{ plan.cost }}<span
          style="font-family: 'Helvetica Neue', sans-serif !important;">&#8381;</span>

        </VH3>
      </div>
      <div
        :style='{ backgroundColor: colors[100] }'
        v-else-if='plan.locked_message'
        class='plan__locked'
      >
        <VH3>{{ plan.locked_message }}</VH3>
      </div>
      <VH3 :color='colors[100]' v-else>
        Текущий пакет
      </VH3>
      <VButton
        ml='var(--space-third)'
        v-if='!current && !plan.locked_message'
        :class="{
          plan__bottom__button: true,
          'plan__bottom__button--selected': isSelected
        }"
        pa='var(--space-third)'
        weight='regular'
        color='var(--white-base)'
        :bg='colors[100]'
        @click='handleButton'
      >
        {{ isSelected ? btnText.selected : typeof plan.trial === 'number' && inList ? 'Получить' : btnText.default }}
      </VButton>
    </div>
    <div :style="{background: colors[25]}" class="plan__hint-text" v-if="plan.hint_text">
      <p>{{ plan.hint_text }}</p>
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
    },
    isFree: {
      type: Boolean,
      default: false
    },
    inList: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleButton() {
      this.$emit('btnClick', this.plan.id)
    }
  },
  created() {
    const base = this.plan.color
    this.colors = {
      100: base,
      70: base + this.$ds.getHexOpacity(70),
      50: base + this.$ds.getHexOpacity(50),
      25: base + this.$ds.getHexOpacity(25)
    }
  }
}
</script>

<style scoped>
.plan {
  padding: var(--space-half);
  border-radius: var(--radius);
  overflow: hidden;
}

.plan h2 {
  line-height: 1;
}

.plan__description {
  white-space: pre-wrap;
  line-height: 1.5;
}

.plan__hint-text {
  --m-indent: calc(var(--space-half)*-1);
  margin: var(--space-third) var(--m-indent) var(--m-indent) var(--m-indent);
  padding: var(--space-half) var(--space-half);
}

.plan__hint-text p {
  color: var(--white-trans1);
  font-weight: 300;
}

.plan__locked {
  background: #00000055;
  width: 100%;
  padding: var(--space-half);
  margin: 0 calc(-1 * var(--space-half)) calc(-1 * var(--space-half)) calc(-1 * var(--space-half));
}

.plan__locked h3 {
  text-align: center;
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

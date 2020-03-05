<template>
  <div>
    <VPageHeading button>
      Смена плана
      <template v-slot:info>
        <VTipSmall>Мы возвращаем деньги за остаток месяца</VTipSmall>
      </template>
    </VPageHeading>
  </div>
</template>
<script>
import { VTipSmall } from '../components/'
export default {
  middleware: ['requireSub'],
  components: { VTipSmall }
}
</script>

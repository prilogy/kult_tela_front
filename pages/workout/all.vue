<template>
  <div>
    <VH2>Все упражнения</VH2>
    <div class="body"></div>
  </div>
</template>

<script>
import { VPlanCard, VInput, VIcon, VTipSmall } from '../../components/'
import { mapGetters } from 'vuex'

export default {
  components: {
    VIcon,
    VInput,
    VPlanCard,
    VTipSmall
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.body {
  margin-top: var(--space-half);
}
</style>

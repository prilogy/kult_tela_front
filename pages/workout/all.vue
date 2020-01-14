<template>
  <div>
    <VH2>Все упражнения</VH2>
    <div class="body"></div>
  </div>
</template>

<script>
import {
  VH1,
  VH2,
  VH3,
  VPlanCard,
  VInput,
  VP,
  VIcon,
  VButton,
  VTipSmall
} from '../../components/'
import { mapGetters } from 'vuex'

export default {
  components: {
    VButton,
    VIcon,
    VH2,
    VP,
    VInput,
    VPlanCard,
    VH1,
    VH3,
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

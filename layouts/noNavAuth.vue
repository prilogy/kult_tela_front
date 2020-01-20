<template>
  <div>
    <main>
      <nuxt />
    </main>
    <VError></VError>
    <VSuccess></VSuccess>
    <!--    <VFooter></VFooter>-->
  </div>
</template>

<script>
import {
  VNav,
  VFooter,
  VError,
  VSuccess,
  VRankNotification
} from '~/components'
import { mapActions } from 'vuex'

export default {
  middleware: 'notAuth',
  components: {
    VSuccess,
    VNav,
    VFooter,
    VError
  }
}
</script>

<style scoped>
body {
  background: var(--grey-base);
  max-width: var(--body-max-width);
  margin: 0 auto;
}
main {
  padding: var(--space);
}
</style>

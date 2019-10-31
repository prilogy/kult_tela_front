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
import { VFooter, VError, VSuccess } from '~/components'
export default {
  components: {
    VSuccess,
    VFooter,
    VError
  }
}
</script>

<style>
body {
  background: var(--grey-base);
  max-width: var(--body-max-width);
  margin: 0 auto;
}
main {
  padding: var(--space);
}
</style>

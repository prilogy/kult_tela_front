<template>
  <div>
    <VNav></VNav>
    <main>
      <nuxt />
    </main>
    <VError></VError>
    <!--    <VFooter></VFooter>-->
  </div>
</template>

<script>
import { VNav, VFooter, VError } from '~/components';
export default {
  components: {
    VNav,
    VFooter,
    VError
  }
};
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

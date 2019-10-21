<template>
  <div>
    <VNav></VNav>
    <main>
      <nuxt />
    </main>
    <!--    <VFooter></VFooter>-->
  </div>
</template>

<script>
import { VNav, VFooter } from '~/components';
export default {
  components: {
    VNav,
    VFooter
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

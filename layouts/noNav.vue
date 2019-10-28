<template>
  <div>
    <main>
      <nuxt />
    </main>
    <VError></VError>
    <!--    <VFooter></VFooter>-->
  </div>
</template>

<script>
import { VFooter, VError } from '~/components';
export default {
  components: {
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

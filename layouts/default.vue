<template>
  <div>
    <VNav></VNav>
    <main>
      <nuxt />
    </main>
    <VError></VError>
    <VSuccess></VSuccess>
    <!--    <VFooter></VFooter>-->
  </div>
</template>

<script>
import { VNav, VFooter, VError, VSuccess } from '~/components'
import { mapActions } from 'vuex'

export default {
  middleware: 'notAuth',
  components: {
    VSuccess,
    VNav,
    VFooter,
    VError
  },
  methods: {
    ...mapActions({
      SET_CURRENT_LINK_ID: 'nav/SET_CURRENT_LINK_ID'
    })
  },
  created() {
    this.SET_CURRENT_LINK_ID()
  },
  watch: {
    $route() {
      this.SET_CURRENT_LINK_ID()
    }
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

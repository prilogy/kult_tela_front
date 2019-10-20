<template>
  <div class="container">
    <div>
      <h1 :style="color" class="title">kult_tela_frontend</h1>
      <H1 weight="regular" :color="$ds.colors.grey.light1">sdss</H1>
      <h2 class="subtitle">frontend for kult tela</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import { H1 } from "../components/index.js";

export default {
  components: { H1 },
  computed: {
    color() {
      return {
        color: this.$ds.withOpacity(this.$ds.colors.grey.base, 50)
      };
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<template>
  <div class="avatar">
    <img alt="avatar wrapper" class="avatar__wrapper" :src="wrapper_src" />
    <img alt="avatar" class="avatar__img" :src="image_src" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    image_src: String,
    rank: Number
  },
  computed: {
    wrapper_src() {
      return 1
    }
  }
}
</script>

<style scoped>
.avatar {
  /*position: relative;
  height: 140px;
  overflow: hidden;*/
}

.avatar__img {
  width: 100px;
  position: absolute;
}

.avatar__wrapper {
  width: 100px;
  z-index: 1;
  position: absolute;
}
</style>

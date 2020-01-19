<template>
  <div class="display: block">
    <div :style="'--size:' + size" class="wrapper">
      <div class="avatar">
        <img
          @load="resizeAndCenter($refs.image, SIZE)"
          ref="image"
          :style="imgStyle"
          class="avatar__img"
          :src="src"
          alt="avatar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import resizeAndCenterImage from '../../mixins/resizeAndCenterImage'
export default {
  mixins: [resizeAndCenterImage],
  props: {
    src: {
      type: String
    },
    size: {
      type: String,
      default: '50px'
    }
  },
  data() {
    return {
      imgStyle: {}
    }
  },
  computed: {
    SIZE() {
      return this.size.replace('px', '')
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: var(--size);
  height: var(--size);
  overflow: hidden;
  border-radius: 100px;
}
.avatar {
  position: relative;
}
.avatar__img {
  position: absolute;
}
</style>

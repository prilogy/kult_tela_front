<template>
  <div class="wrapper">
    <div class="avatar">
      <img alt="avatar wrapper" class="avatar__wrapper" :src="wrapper_src" />
      <img
        :style="style"
        ref="avatar"
        alt="avatar"
        class="avatar__img"
        :src="image_src"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    image_src: String,
    rank: Number
  },
  data() {
    return {
      style: null
    }
  },
  computed: {
    wrapper_src() {
      const rank = this.rank
      return '/ranks/' + rank + '.png'
    }
  },
  async created() {
    const img = new Image()
    img.src = this.image_src
    let percent
    img.onload = () => {
      percent = (100 * 125) / img.height / 100
      console.log(img.width * percent)
      if (img.width * percent > 125) {
        this.style = { left: '-50%' }
      }
    }
  }
} //125 176 140
</script>

<style scoped>
.avatar {
  --avatar-width: 25vw;
  --avatar-height: 35vw;
  --avatar-inner-height: 27vw;
  --avatar-max-width: 206px;
  --avatar-max-height: 290px;
  position: relative;
  height: var(--avatar-height);
  width: var(--avatar-width);
  overflow: hidden;
  max-height: 290px;
  max-width: 206px;
}

.avatar__img {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  max-height: var(--avatar-inner-height);
}

.avatar__wrapper {
  width: var(--avatar-width);
  max-height: var(--avatar-max-height);
  max-width: var(--avatar-max-width);
  z-index: 1;
  position: absolute;
}
.wrapper {
  box-shadow: 0 0 15px 7px #191118;
  width: var(--avatar-width);
  max-height: var(--avatar-max-height);
  max-width: var(--avatar-max-width);
}
</style>

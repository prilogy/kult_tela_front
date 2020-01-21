<template>
  <div class="wrapper">
    <div class="avatar" v-show="_loaded">
      <img
        ref="rankImage"
        alt="avatar wrapper"
        class="avatar__wrapper"
        :src="wrapper_src"
        @load="setLoaded(0)"
      />
      <img
        :style="style"
        ref="avatar"
        alt="avatar"
        class="avatar__img"
        :src="image_src"
        @load="setLoaded(1)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image_src: String,
    rank: Number
  },
  data() {
    return {
      style: {},
      loaded: { 0: false, 1: false }
    }
  },
  computed: {
    wrapper_src() {
      const rank = this.rank
      return '/ranks/' + rank + '.png'
    },
    _loaded() {
      return this.loaded[0] && this.loaded[1]
    }
  },
  methods: {
    setLoaded(id) {
      this.loaded[id] = true
      if (this._loaded === true) {
        this.resize(this.$refs.avatar)
      }
    },
    resize(img) {
      const _img = new Image()
      _img.src = this.wrapper_src
      _img.onload = () => {
        const height = img.clientHeight
        const width = img.clientWidth
        const size = this.$refs.rankImage.clientHeight

        let leftOffset = null

        if (width > height) {
          const diffK = 1 - (height - size) / height
          const newWidth = width * diffK
          leftOffset = -1 * ((newWidth - size) / 2)

          this.style = {
            left: leftOffset + 'px'
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  --avatar-width: 30vw;
  --avatar-height: 42vw;
  --avatar-inner-height: 83%;
  --avatar-max-width: 206px;
  --avatar-max-height: 290px;
  --avatar-min-width: 93px;
  --avatar-min-height: 135px;

  border-radius: var(--radius-half);
  overflow: hidden;

  width: var(--avatar-width);
  box-shadow: 0 0 15px 7px #191118;

  max-height: var(--avatar-max-height);
  height: var(--avatar-height);
  max-width: var(--avatar-max-width);
  min-width: var(--avatar-min-width);
  min-height: var(--avatar-min-height);
  background: var(--yellow-base);
}

@keyframes anima {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.avatar {
  position: relative;
  height: var(--avatar-height);
  width: var(--avatar-width);
  overflow: hidden;
  max-height: 290px;
  max-width: 206px;
  min-width: var(--avatar-min-width);
  min-height: var(--avatar-min-height);
  animation: anima 0.3s;
}

.avatar__img {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  height: var(--avatar-inner-height);
  max-height: var(--avatar-max-height);
  min-width: calc(var(--avatar-min-width) - 10px);
  min-height: calc(var(--avatar-min-height) - 30px);
}

.avatar__wrapper {
  width: var(--avatar-width);
  max-height: var(--avatar-max-height);
  max-width: var(--avatar-max-width);
  z-index: 1;
  position: absolute;
  min-width: var(--avatar-min-width);
  min-height: var(--avatar-min-height);
}
</style>

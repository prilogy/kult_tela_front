<template>
  <div class="avatar__new">
    <img v-if="img" :src="img.src" alt="avatar" />
    <img
      class="blank"
      alt="blank"
      v-if="!img"
      style="opacity: 0"
      :src="wrapper_src"
    />
    <canvas
      style="visibility: hidden; position: fixed"
      width="413px"
      height="582px"
      ref="cnv"
    ></canvas>
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
      viewImage: true,
      style: {},
      loaded: { 0: false, 1: false },
      img: null
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
  },
  mounted() {
    const canvas = this.$refs.cnv
    const ctx = canvas.getContext('2d')

    const img = new Image()
    const wrapper_img = new Image()
    img.crossOrigin = '*'
    wrapper_img.crossOrigin = '*'

    img.src = this.image_src
    wrapper_img.src = this.wrapper_src

    img.onload = () => {
      wrapper_img.onload = () => {
        console.log('load')
        const height = img.height
        const width = img.width
        const size = canvas.clientHeight * 0.75

        let leftOffset, newWidth, newHeight

        if (width > height) {
          const diffK = 1 - (height - size) / height
          newWidth = width * diffK
          newHeight = height * diffK
          leftOffset = -1 * ((newWidth - size) / 2)
        } else if (width < height) {
          const diffK = 1 - (height - size) / height
          newHeight = height * diffK
          newWidth = width * diffK
          if (newWidth < canvas.clientWidth * 0.9) {
            leftOffset = (canvas.clientWidth - newWidth) / 2
          }
        }

        ctx.drawImage(img, leftOffset || 0, 0, newWidth, newHeight)
        ctx.drawImage(
          wrapper_img,
          0,
          0,
          canvas.clientWidth,
          canvas.clientHeight
        )
        let image = new Image()
        image.id = 'pic'
        image.src = canvas.toDataURL('image/jpeg', 1.0)
        this.img = image
        this.$refs.cnv.style.display = 'none'
      }
    }
  }
}
</script>

<style scoped>
.avatar__new {
  min-width: 114px;
  background: var(--yellow-base);
  max-width: 33vw;
  border-radius: var(--radius-half);
  overflow: hidden;
}

.avatar__new p {
  width: 33vw;
}

.avatar__new img {
  animation: anima 0.3s;
  width: 100%;
  border-radius: var(--radius-half);
}

.blank {
  margin-bottom: 1px;
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
</style>

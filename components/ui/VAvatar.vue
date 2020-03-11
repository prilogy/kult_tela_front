<template>
  <transition name="showup">
    <div class="avatar__new" :style="{ height: !img ? '160px' : '' }">
      <img
        alt="avatar"
        v-show="img && img.src"
        :src="(img && img.src) || wrapper_src"
      />
      <canvas
        style="position: fixed; opacity: 0"
        width="413px"
        height="582px"
        ref="cnv"
      ></canvas>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    image_src: String,
    rank: Number
  },
  data() {
    return {
      img: null
    }
  },
  computed: {
    wrapper_src() {
      const rank = this.rank == 10 ? 9 : this.rank
      return '/ranks/' + rank + '.png'
    }
  },
  mounted() {
    const canvas = this.$refs.cnv
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight)
    gradient.addColorStop(0, '#e5e1d5')
    gradient.addColorStop(1, '#cdc1ab')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    const img = new Image()
    const wrapper_img = new Image()
    img.crossOrigin = '*'
    wrapper_img.crossOrigin = '*'

    img.src = this.image_src

    img.onload = () => {
      wrapper_img.src = this.wrapper_src
      wrapper_img.onload = () => {
        const height = img.height
        const width = img.width

        let leftOffset, newWidth, newHeight, topOffset

        if (width >= height) {
          const size = canvas.clientHeight * 0.75
          const diffK = 1 - (height - size) / height
          newWidth = width * diffK
          newHeight = height * diffK
          leftOffset = -1 * ((newWidth - size) / 2)
        } else {
          const size = canvas.clientWidth * 0.9

          const diffK = 1 - (width - size) / width
          newHeight = height * diffK
          newWidth = width * diffK
          topOffset = -1 * ((newHeight - size) / 2.5)
          if (newWidth < canvas.clientWidth) {
            leftOffset = (canvas.clientWidth - newWidth) / 2
          }
        }

        ctx.drawImage(img, leftOffset || 0, topOffset || 0, newWidth, newHeight)
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
  height: fit-content;
  background: #cdc1ab;
  max-width: 35%;
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

<template>
  <div class="avatar__new">
    <img alt="avatar" :src="(img && img.src) || wrapper_src" />
    <canvas
      style="position: fixed; opacity: 0"
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
      img: null
    }
  },
  computed: {
    wrapper_src() {
      const rank = this.rank
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
        const size = canvas.clientHeight * 0.75

        let leftOffset, newWidth, newHeight

        if (width >= height) {
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
  height: fit-content;
  background: var(--yellow-base);
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

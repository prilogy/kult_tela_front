export default {
  data() {
    return {
      imgStyle: {}
    }
  },
  methods: {
    resizeAndCenter(img, size) {
      const height = img.clientHeight
      const width = img.clientWidth
      let leftOffset = null,
        topOffset = null

      if (width > height) {
        const diffK = 1 - (height - size) / height
        const newWidth = width * diffK
        leftOffset = -1 * ((newWidth - size) / 2)
      } else {
        const diffK = 1 - (width - size) / width
        const newHeight = height * diffK
        topOffset = -1 * ((newHeight - size) / 2)
      }

      this.imgStyle = {
        width: topOffset ? size + 'px' : null,
        height: leftOffset ? size + 'px' : null,
        left: leftOffset + 'px',
        top: topOffset + 'px'
      }
    }
  }
}

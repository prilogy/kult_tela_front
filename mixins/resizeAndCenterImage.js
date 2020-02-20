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
        topOffset = null,
        newWidth,
        newHeight

      if (width > height) {
        const diffK = 1 - (height - size) / height
        newWidth = width * diffK
        leftOffset = -1 * ((newWidth - size) / 2)
      } else {
        const diffK = 1 - (width - size) / width
        newHeight = height * diffK
        topOffset = -1 * ((newHeight - size) / 2)
      }

      this.imgStyle = {
        width: newWidth + 'px', //topOffset ? size + 'px' : null,
        height: newHeight + 'px', //leftOffset ? size + 'px' : null,
        left: leftOffset + 'px',
        top: topOffset + 'px'
      }
    }
  }
}

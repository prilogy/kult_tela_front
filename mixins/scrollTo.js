export default {
  methods: {
    scrollTo(selector = '', timeout = 0) {
      setTimeout(() => {
        try {
          document
            .querySelector(selector)
            .scrollIntoView({ behavior: 'smooth' })
        } catch (e) {}
      }, timeout)
    }
  }
}

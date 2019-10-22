const WEIGHTS = {
  bold: 600,
  medium: 500,
  regular: 400,
  normal: 400,
  light: 300,
  600: 600,
  500: 500,
  400: 400,
  300: 300
};

export default {
  props: {
    weight: String,
    color: String
  },
  computed: {
    typography() {
      return {
        color: this.color || '',
        fontWeight: WEIGHTS[this.weight] || this.defaultWidth || ''
      };
    }
  }
};

const WEIGHTS = {
  bold: 600,
  medium: 500,
  regular: 400,
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
    style() {
      return {
        color: this.color || '',
        fontWeight: WEIGHTS[this.weight] || this.defaultWidth || ''
      };
    }
  },
  created() {
    console.log(this.fontWeight);
  }
};

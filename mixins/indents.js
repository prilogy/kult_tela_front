export default {
  props: {
    mt: String,
    mb: String,
    ml: String,
    mr: String,
    mx: String,
    my: String,
    ma: String,

    pt: String,
    pb: String,
    pl: String,
    pr: String,
    px: String,
    py: String,
    pa: String
  },
  computed: {
    indents() {
      const v = this
      return {
        margin: v.ma || (v.my || v.mx) ? v.my || 0 + ' ' + v.mx || 0 : '',
        marginTop: v.mt || '',
        marginBottom: v.mb || '',
        marginLeft: v.ml || '',
        marginRight: v.mr || '',

        padding: v.pa || (v.py + ' ' + v.px || ''),
        paddingTop: v.pt || '',
        paddingBottom: v.pb || '',
        paddingLeft: v.pl || '',
        paddingRight: v.pr || ''
      }
    }
  }
}

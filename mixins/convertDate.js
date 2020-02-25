export default {
  methods: {
    getDate(date) {
      if (!date) return ''
      const dt = date.split('.')
      const tdt = this.dateToday.split('.')
      if (dt[0] === tdt[0] && dt[1] === tdt[1] && dt[2] === tdt[2])
        return 'Сегодня'
      else if (
        parseInt(tdt[0]) - 1 === parseInt(dt[0]) &&
        dt[1] === tdt[1] &&
        dt[2] === tdt[2]
      )
        return 'Вчера'
      else if (
        parseInt(tdt[0]) - 2 === parseInt(dt[0]) &&
        dt[1] === tdt[1] &&
        dt[2] === tdt[2]
      )
        return 'Позавчера'
      else if (
        parseInt(tdt[0]) - 3 === parseInt(dt[0]) &&
        dt[1] === tdt[1] &&
        dt[2] === tdt[2]
      )
        return '3 дня назад'
      else if (
        parseInt(tdt[0]) - 4 === parseInt(dt[0]) &&
        dt[1] === tdt[1] &&
        dt[2] === tdt[2]
      )
        return '4 дня назад'
      else return date
    }
  }
}

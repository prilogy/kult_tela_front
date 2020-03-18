export default {
  methods: {
    getAlias(date) {
      if (date) {
        const dateToday = this.convertDate(new Date()).date
        const dt = date.split('.')
        const tdt = dateToday.split('.')
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
      } else return date
    },
    convertDate(UTCdate) {
      const timestamp = new Date(UTCdate)
      const month =
        timestamp.getMonth() + 1 > 9
          ? timestamp.getMonth() + 1
          : '0' + (timestamp.getMonth() + 1).toString()

      const day =
        timestamp.getDate() > 9
          ? timestamp.getDate()
          : '0' + timestamp.getDate().toString()

      const hours =
        timestamp.getHours() > 9
          ? timestamp.getHours()
          : '0' + timestamp.getHours().toString()

      const mins =
        timestamp.getMinutes() > 9
          ? timestamp.getMinutes()
          : '0' + timestamp.getMinutes().toString()
      return {
        timestamp,
        date: day + '.' + month + '.' + timestamp.getFullYear(),
        time: hours + ':' + mins
      }
    }
  }
}

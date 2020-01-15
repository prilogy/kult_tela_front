export default function(ctx) {
  const axios = ctx.$axios

  this.getImageLink = image_src => {
    if (!image_src.includes('http://'))
      return process.env.API_URL + 'public/images/' + image_src
    else return image_src
  }

  this.Auth = {
    login: user => axios.$post('/auth', user), // user = { email, password }
    createBlankProfile: data => axios.$put('/auth/signup', data), //user = { email }
    tokenAuth: () => axios.$get('/auth'), // headers must contain token
    isFillAllowed: data => axios.$post('/auth/signup', data),
    fillInfo: data => axios.$post('/auth/signup/fill', data)
  }

  this.User = {
    updateWeight: data => axios.$post('/user/update/weight', data),
    updateWorkout: data => axios.$post('/user/update/workout', data),
    setLastSeenNotification: id =>
      axios.$get('/user/notification/set-last-seen/' + id)
  }

  this.Plans = {
    getAll: () => axios.$get('/plan/all')
  }

  this.Top = {
    allTime: () => axios.$get('/top/all-time'),
    lastMonth: () => axios.$get('/top/last-month')
  }

  this.Food = {
    getDaily: () => axios.$get('/food/daily')
  }

  this.FoodReport = {
    getStatus: () => axios.$get('/user/food/report'),
    send: images => axios.$post('/user/food/report', images)
  }

  this.Workout = {
    getById: id => axios.$get('/workout/' + id)
  }

  this.Exercise = {
    getById: id => axios.$get('/exercise/' + id)
  }
}

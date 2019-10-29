export default function(ctx) {
  const axios = ctx.$axios

  this.Auth = {
    login: user => axios.$post('/auth', user), // user = { email, password }
    createBlankProfile: data => axios.$post('/auth-signup'), //user = { email, password }
    tokenAuth: () => axios.$get('/auth'), // headers must contain token
    isFillAllowed: data => axios.$post('/auth-signup', data),
    fillInfo: data => axios.$post('/auth-signup/fill', data)
  }

  this.Plans = {
    getAll: () => axios.$get('/plans')
  }
}

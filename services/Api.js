export default function(ctx) {
  const axios = ctx.$axios

  this.Auth = {
    login: user => axios.$post('/auth', user)
  }
}

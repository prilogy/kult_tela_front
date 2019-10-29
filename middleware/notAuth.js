export default function({ store, redirect }) {
  const userLoggedIn = !!store.state.auth.isAuthenticated
  if (!userLoggedIn) return redirect('/login')
}

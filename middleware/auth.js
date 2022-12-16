export default function ({ store, redirect }) {
  if (!store.state.token || !store.state.user) return redirect('/login')
}

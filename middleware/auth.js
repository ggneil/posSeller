export default function ({ store, redirect }) {
  if (!store.state.authUser) {
    return redirect('/account/login')
  }
  console.log(store.state.authUser)
}

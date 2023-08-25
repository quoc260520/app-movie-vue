export default function ({ route, redirect, store }) {
  const token = store.state.auth.token
  if (!token) {
    store.dispatch("getInfo")
    const userVerify = store.state.auth.name
    if (!userVerify) {
      return redirect("/")
    }
  }
}

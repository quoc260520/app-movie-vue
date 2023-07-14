export default function ({ route, redirect, store }) {
  const user = store.state.auth.name
  if (!user) {
    store.dispatch("getInfo")
    const userVerify = store.state.auth.name
    if (!userVerify) {
      return redirect("/")
    }
  }
}

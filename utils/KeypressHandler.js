export default (e) => {
  const handlerKeypress = (e) => {
    if (e.keyCode === 13) {
      if (message) {
        sendMessage()
      }
    }
  }
}

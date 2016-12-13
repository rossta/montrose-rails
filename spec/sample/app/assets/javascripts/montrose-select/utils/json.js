export default {
  parse(value) {
    let json = {}

    if (!value || !value.length) { return json }

    try {
      return JSON.parse(value)
    }
    catch(err) {
      return json
    }
  },

  stringify(obj) {
    if (!obj) { return null }

    return JSON.stringify(obj)
  }
}

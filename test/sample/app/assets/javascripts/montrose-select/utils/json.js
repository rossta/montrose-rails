export default {
  parse(value) {
    let json = {}

    if (!value || !value.length) { return json }

    try {
      json = JSON.parse(value)
    }
    catch(err) {
      return json
    }
  }
}

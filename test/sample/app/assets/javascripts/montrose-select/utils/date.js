export default {
  now() {
    return this.parseDate(this.formatDate(new Date()))
  },

  formatDate(givenDate) {
    const date = new Date(givenDate.getTime())
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())

    return this.normalizeDateString(date.toISOString())
  },

  normalizeDateString(string) {
    return string.substr(0, 10)
  },

  parseDate(string) {
    const dateString = this.normalizeDateString(string)
    const [year, offsetMonth, day] = dateString.split('-')
    const month = offsetMonth - 1 // Date months are 0-based

    return new Date(year, month, day)
  },
}

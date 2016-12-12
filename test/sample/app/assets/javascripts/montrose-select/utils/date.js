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
    const [dateString, timeString] = string.split('T')
    const [year, month, day, _rest] = dateString.split('-')

    return [year, month, day].join('-')
  },

  parseDate(string) {
    const [dateString, timeString] = string.split('T')
    const [year, offsetMonth, day] = dateString.split('-')
    const month = offsetMonth - 1 // Date months are 0-based

    return new Date(year, month, day)
  },
}

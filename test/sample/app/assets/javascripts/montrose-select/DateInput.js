import { h, Component } from 'preact'

import { time } from './utils'

class DateInput extends Component {
  onChange(event) {
    this.props.onChange(this.parseDate(event.target.value))
  }

  formatDate(date) {
    return time.formatDate(date)
  }

  parseDate(dateString) {
    return time.parseDate(dateString)
  }

  render({ name, value, disabled }, { options }) {
    const formattedValue = this.formatDate(value)

    return (
      <input
        type="date"
        name={ name }
        value={ formattedValue }
        onChange={ ::this.onChange }
        />
    )
  }
}

DateInput.defaultProps = {
  disabled: false
}

export default DateInput

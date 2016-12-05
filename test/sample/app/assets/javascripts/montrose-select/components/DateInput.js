import { h, Component } from 'preact'

import { time } from '../utils'

class DateInput extends Component {
  onChange(event) {
    const date = time.parseDate(event.target.value).toISOString()

    this.props.onChange(date)
  }

  render({ name, value, disabled }, { options }) {
    const formattedValue = time.normalizeDateString(value)

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

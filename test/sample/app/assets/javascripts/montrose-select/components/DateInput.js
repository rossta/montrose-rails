import { h, Component } from 'preact'

import { date } from '../utils'

class DateInput extends Component {
  onChange(event) {
    const value = date.parseDate(event.target.value).toISOString()

    this.props.onChange(value)
  }

  render({ name, value, disabled, className }, { options }) {
    const formattedValue = date.normalizeDateString(value)

    console.log('DateInput', formattedValue)

    return (
      <input
        className={ className }
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

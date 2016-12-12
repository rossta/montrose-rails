import { h, Component } from 'preact'

import { date } from '../utils'

class DateInput extends Component {
  onChange(event) {
    const value = date.parseDate(event.target.value).toISOString()

    this.props.onChange(value)
  }

  render({ name, value, className, isActive }, { options }) {
    const formattedValue = date.normalizeDateString(value)

    console.log('DateInput', formattedValue)

    return (
      <span>
      {
        isActive ?

          <input
            className={ className }
            type="date"
            name={ name }
            value={ formattedValue }
            onChange={ ::this.onChange }
            /> :

          <input
            className="montrose-inline montrose-disabled-placeholder"
            type="date"
            disabled="true" />
      }
      </span>
    )
  }
}

export default DateInput

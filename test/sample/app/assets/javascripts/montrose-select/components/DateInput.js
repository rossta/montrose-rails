import { h, Component } from 'preact'

import { date } from '../utils'

class DateInput extends Component {
  constructor(props) {
    super(props)

    this.datePickerOptions = props.datePicker || {}
  }

  componentDidMount() {
    const { onReady } = this.datePickerOptions

    if (onReady) {
      this.datePicker = onReady.call(this, this.base)
    }
  }

  onChange(event) {
    const value = this.formatDate(event.target.value)
    this.props.onChange(value)
  }

  formatDate(value) {
    const { formatDate } = this.datePickerOptions

    if (!value.length) {
      return value
    }

    if (formatDate) {
      return formatDate(value)
    }

    return date.formatDate(date.parseDate(value))
  }

  renderCustomDatePicker({ name, className, isActive, datePicker, formattedValue }) {
    return <input
        className={ className }
        type={ datePicker.type || "text" }
        name={ name }
        value={ formattedValue }
        disabled={ !isActive }
        onChange={ ::this.onChange }
        />
  }

  renderDefaultDatePicker({ name, className, isActive, formattedValue }) {
    return isActive ?
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

  render(props) {
    const { datePicker, value } = props
    const formattedValue = date.normalizeDateString(value)

    return datePicker ?
      this.renderCustomDatePicker({...props, formattedValue}) :
      this.renderDefaultDatePicker({...props, formattedValue})
  }
}

DateInput.defaultProp = {
  datePicker: null
}

export default DateInput

import { h, Component } from 'preact'

import { date } from '../utils'

class DateInput extends Component {
  componentDidMount() {
    const { datePicker: { onReady }} = this.props

    if (onReady) {
      this.datePicker = onReady.call(this, this.base)
    }
  }

  onChange(event) {
    const value = date.parseDate(event.target.value).toISOString()

    this.props.onChange(value)
  }

  renderCustomDatePicker({ name, value, className, isActive, datePicker, formattedValue }) {
    return <input
        className={ className }
        type={ datePicker.type || "text" }
        name={ name }
        value={ formattedValue }
        disabled={ !isActive }
        onChange={ ::this.onChange }
        />
  }

  renderDefaultDatePicker({ name, value, className, isActive, formattedValue }) {
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

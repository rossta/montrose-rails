import { h, Component } from 'preact'

import { date } from '../utils'

class CustomDateInput extends Component {
  componentDidMount() => {
    const { datePicker: { onReady } } = this.props

    if (onReady) {
      onReady(this.base)
    }
  }

  onChange(event) {
    this.props.onChange(event.target.value)
  }

  render({ name, value, className, type }, { options }) {
    const formattedValue = date.normalizeDateString(value)

    return (
      <input
        className={ className }
        type={ type }
        name={ name }
        value={ formattedValue }
        onChange={ ::this.onChange }
        />
    )
  }
}

CustomDateInput.defaultProps {
  type: 'text'
}

export default CustomDateInput

import { h, Component } from 'preact'

export default class DateInput extends Component {
  onChange(event) {
    this.onChange(event.target.value)
  }

  render(props, state) {
    const { name, value } = props
    const { options } = state

    return (
      <input
        type="date"
        name={ name }
        value={ value }
        onChange={ ::this.onChange }
        />
    )
  }
}

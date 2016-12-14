import { h, Component } from 'preact'

export default class FrequencySelect extends Component {
  constructor() {
    super()

    this.state = {
      options: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    }
  }

  onChange(event) {
    event.preventDefault()
    const interval = parseInt(event.target.value, 10)
    this.props.onChange({ interval })
  }

  renderOptions(options) {
    return (
      options.map((value, key) => {
        return <option {...{key, value}}>{value}</option>
      })
    )
  }

  render({ name, onChange, selectedValue, className }, { options }) {
    const value = '' + selectedValue || options[0]

    return (
      <label>
        <select
          className={ className }
          name={ name }
          value={ value }
          onChange={ ::this.onChange }
          >
          { this.renderOptions(options) }
        </select>
      </label>
    )
  }
}

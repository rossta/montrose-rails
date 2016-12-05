import { h, Component } from 'preact'

export default class FrequencySelect extends Component {
  constructor() {
    super()

    this.state = {
      options: [
        {
          label: 'Daily',
          value: 'day',
        },
        {
          label: 'Weekly',
          value: 'week',
        },
        {
          label: 'Monthly',
          value: 'month',
        },
        {
          label: 'Yearly',
          value: 'year'
        }
      ]
    }
  }

  onChange(event) {
    event.preventDefault()

    this.props.onChange(event.target.value)
  }

  renderOptions(options) {
    return (
      options.map(({label, value}, key) => {
        return <option {...{key, value}}>{label}</option>
      })
    )
  }

  render({ name, onChange, selectedValue }, { options }) {

    return (
      <select name={name}
        value={selectedValue || options[0].value}
        onChange={ ::this.onChange }
        >
        { this.renderOptions(options) }
      </select>
    )
  }
}
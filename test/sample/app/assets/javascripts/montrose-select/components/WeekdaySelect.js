import { h, Component } from 'preact'
import { array } from '../utils'

export default class WeekdaySelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      day: new Set(this.props.day || [])
    }
  }

  allDays = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S', ]

  isChecked(selectedDays, value) {
    return array.contains(selectedDays, value)
  }

  onChange(event) {
    const checkbox = event.target
    const value = parseInt(checkbox.value, 10)
    let set = this.state.day

    checkbox.checked ?  set.add(value) : set.delete(value)

    this.setState({ day: set })

    this.props.onChange({ day: [...set] })
  }

  render({ day }, state) {
    day = day || [...state.day]
    console.log('selected weekdays', day)

    return (
      <div>
      {
        this.allDays.map((label, index) => {
          return (
            <label key={index}>
              <input
                type="checkbox"
                value={index}
                checked={ this.isChecked(day, index) }
                onChange={ ::this.onChange }
                />
              {label}
            </label>
          )
        })
      }
      </div>
    )
  }
}

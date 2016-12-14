import { h, Component } from 'preact'
import Set from 'es6-set'
import { array, date } from '../utils'

export default class WeekdaySelect extends Component {
  allDays = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S', ]

  constructor(props) {
    super(props)

    const { day, starts } = props

    this.state = {
      day: new Set(day || [date.parseDate(starts).getDay()])
    }
  }

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

  render({ name, day }, state) {
    day = day || [...state.day]

    return (
      <div>
      {
        this.allDays.map((label, index) => {
          return (
            <label key={index} className="montrose-inline">
              <input
                type="checkbox"
                value={ index }
                name={ name }
                checked={ this.isChecked(day, index) }
                onChange={ ::this.onChange }
                />
              { label }
            </label>
          )
        })
      }
      </div>
    )
  }
}

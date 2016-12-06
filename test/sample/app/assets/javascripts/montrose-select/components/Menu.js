import { h, Component } from 'preact'

import {
  FrequencySelect,
  IntervalSelect,
  DateInput,
  EndingPicker,
} from '../components'

import {
  time
} from '../utils'

class Menu extends Component {
  frequencyDidChange(frequency) {
    this.onChange({ frequency })
  }

  intervalDidChange(interval) {
    this.onChange({ interval })
  }

  startDateDidChange(starts) {
    this.onChange({ starts })
  }

  endingDidChange({ total, until }) {
    this.onChange({ total, until })
  }

  onChange(recurrence) {
    this.props.onChange(recurrence)
  }

  onSubmit(event) {
    event.preventDefault()

    const { frequency, interval, starts, until, total } = this.props

    this.props.onSubmit({ frequency, interval, starts, until, total })
  }

  onCancel(event) {
    event.preventDefault()

    this.props.onCancel()
  }

  render({ frequency, interval, starts, until, total }) {
    return (
      <div className="montrose-wrapper">
        <div className="montrose-overlay"></div>
        <div className="montrose-menu">
          <a className="close-link" href="#" onClick={ ::this.onCancel }>×</a>
          <h3>Repeat</h3>

          <div className="montrose-menu-repeats row">
            <label for="montrose-select-frequency">Repeats:</label>
            <FrequencySelect
              name="montrose-select-frequency"
              className="field"
              selectedValue={ frequency }
              className="column"
              onChange={ ::this.frequencyDidChange }
              />
          </div>

          <div className="montrose-menu-repeats row">
            <label for="montrose-select-interval">Repeat every:</label>
            <IntervalSelect
              name="montrose-select-interval"
              className="field"
              selectedValue={ interval }
              onChange={ ::this.intervalDidChange }
              />
          </div>

          <div className="montrose-menu-start row">
            <label for="montrose-input-start">Starts on:</label>
            <input
              name="montrose-input-start"
              className="field"
              type="text"
              value={ time.normalizeDateString(starts) }
              disabled="true"
              />
          </div>

          <div className="montrose-menu-end row">
            <label>Ends</label>

            <EndingPicker
              className="field"
              starts= { starts }
              until={ until }
              total={ total }
              onChange={ ::this.endingDidChange }
              />
          </div>

          <div class="row">
            <button onClick={ ::this.onSubmit }>Done</button>
            <button onClick={ ::this.onCancel }>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Menu

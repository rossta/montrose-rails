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

    this.props.onSubmit(this.props.recurrence)
  }

  onCancel(event) {
    event.preventDefault()

    this.props.onCancel()
  }

  render({ recurrence, onSubmit, onCancel }) {
    const { frequency, interval, starts, until, total } = recurrence
    return (
      <div className="montrose-menu">
      <a href="#" onClick={ onCancel }>Close</a>
      <h3>Repeat</h3>

      <div className="montrose-menu-repeats">
        <label for="montrose-select-frequency">Repeats:</label>
        <FrequencySelect
          name="montrose-select-frequency"
          selectedValue={ frequency }
          onChange={ ::this.frequencyDidChange }
          />
      </div>

      <div className="montrose-menu-repeats">
        <label for="montrose-select-interval">Repeat every:</label>
        <IntervalSelect
          name="montrose-select-interval"
          selectedValue={ interval }
          onChange={ ::this.intervalDidChange }
          />
      </div>

      <div className="montrose-menu-start">
        <label for="montrose-input-start">Starts on:</label>
        <input
          name="montrose-input-start"
          type="text"
          value={ time.normalizeDateString(starts) }
          disabled="true"
          />
      </div>

      <div class="montrose-menu-end">
        <label>Ends</label>

        <EndingPicker
          starts= { starts }
          until={ until }
          total={ total }
          onChange={ ::this.endingDidChange }
          />
      </div>

      <button onClick={ ::this.onSubmit }>Done</button>
      <button onClick={ ::this.onCancel }>Cancel</button>
    </div>
    )
  }
}

export default Menu

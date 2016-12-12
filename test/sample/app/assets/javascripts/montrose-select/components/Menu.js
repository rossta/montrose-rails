import { h, Component } from 'preact'
import classNames from 'classnames'

import {
  FrequencySelect,
  IntervalSelect,
  WeekdaySelect,
  DateInput,
  EndingPicker,
} from '../components'

import {
  time
} from '../utils'

class Menu extends Component {
  state = { visible: false }

  componentDidMount() {
    // Flushes style changes
    // https://timtaubert.de/blog/2012/09/css-transitions-for-dynamically-created-dom-elements/
    window.getComputedStyle(this.base).opacity;
    this.setState({visible: true})
  }

  onChange(recurrence) {
    this.props.onChange(recurrence)
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.onSubmit(this.propsToRecurrence(this.props))
  }

  propsToRecurrence({ frequency, interval, starts, total, until, day, }) {
    return { frequency, interval, starts, until, total, day, }
  }

  onCancel(event) {
    event.preventDefault()

    this.props.onCancel()
  }

  render({ frequency, interval, starts, total, until, day, }, { visible }) {
    return (
      <div className={ classNames("montrose", { visible }) }>
        <div className="montrose-overlay"></div>
        <div className="montrose-menu">
          <div className="montrose-row montrose-title-row montrose-section">
            <a className="montrose-close-link" href="#" onClick={ ::this.onCancel }>×</a>
            <h3 className="montrose-title">Repeat</h3>
          </div>

          <div class="montrose-section">
            <div className="montrose-menu-repeats montrose-row">
              <label for="montrose-select-frequency">Repeats:</label>
              <div className="montrose-field">
                <FrequencySelect
                  name="montrose-select-frequency"
                  selectedValue={ frequency }
                  onChange={ ::this.onChange }
                  />
              </div>
            </div>

            <div className="montrose-menu-repeats montrose-row">
              <label for="montrose-select-interval">Repeat every:</label>
              <div className="montrose-field">
                <IntervalSelect
                  name="montrose-select-interval"
                  selectedValue={ interval }
                  onChange={ ::this.onChange }
                  />
              </div>
            </div>

            {
              (frequency === "week") ?
                <div className="montrose-menu-weekday montrose-row">
                  <label for="montrose-select-interval">Repeat every:</label>
                  <div className="montrose-field">
                    <WeekdaySelect
                      name="montrose-choose-weekday"
                      day={ day }
                      starts={ starts }
                      onChange={ ::this.onChange }
                      />
                  </div>
                </div> :
                ""
            }

            <div className="montrose-menu-start montrose-row">
              <label for="montrose-input-start">Starts on:</label>
              <div className="montrose-field">
                <input
                  name="montrose-input-start"
                  type="text"
                  value={ time.normalizeDateString(starts) }
                  disabled="true"
                  />
              </div>
            </div>

            <div className="montrose-menu-end montrose-row">
              <label>Ends</label>
              <EndingPicker
                className="montrose-field"
                starts= { starts }
                until={ until }
                total={ total }
                onChange={ ::this.onChange }
                />
            </div>
          </div>

          <div class="montrose-row montrose-section">
            <label>&nbsp;</label>
            <button onClick={ ::this.onSubmit } className='pure-button pure-button-primary'>Done</button>
            <button onClick={ ::this.onCancel } className='pure-button'>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Menu

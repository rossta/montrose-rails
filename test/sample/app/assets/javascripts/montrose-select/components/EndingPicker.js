import { h, Component } from 'preact'

import { DateInput } from '../components'
import { time } from '../utils'

class EndingPicker extends Component {
  onChooseNever() {
    this.setState({ selected: 'never' })
    this.onChoose({ total: null, until: null })
  }

  onChooseTotal() {
    const total = this.props.total || this.state.total || 35

    this.setState({ selected: 'total', total })
    this.onChoose({ total })
  }

  onChooseUntil() {
    const { starts } = this.props
    const until = until || this.state.until || starts || time.formatDate(time.now())

    this.setState({ selected: 'until', until })
    this.onChoose({ until })
  }

  onChoose({ total, until }) {
    if (!total) total = null
    if (!until) until = null

    this.props.onChange({ total, until })
  }

  onChangeTotal(event) {
    const total = event.target.value

    this.setState({ total })
    this.onChoose({ total })
  }

  onChangeUntil(dateString) {
    const until = dateString

    this.setState({ until })
    this.onChoose({ until })
  }

  render({ total, until, starts }, { selected }) {
    const neverSelected = !selected || selected === 'never'
    const totalSelected = selected === 'total'
    const untilSelected = selected === 'until'

    until = until || this.state.until
    total = total || this.state.total

    return(
      <div>
        <div>
          <input
            name="ending-picker"
            type="radio"
            id="ends-never-radio"
            checked={ neverSelected }
            onClick={ ::this.onChooseNever }
            />
          <label for="ends-never-radio">Never</label>
        </div>
        <div>
          <input
            name="ending-picker"
            type="radio"
            id="ends-total-radio"
            selected={ totalSelected }
            onClick={ ::this.onChooseTotal }
            />
          <label for="ends-total-input">
            After
            <input
              type="number"
              name="ends-total-input"
              value={ totalSelected? total : null }
              disabled={ !totalSelected }
              onChange={ ::this.onChangeTotal }
              />
            times
          </label>
        </div>
        <div>
          <input
            name="ending-picker"
            type="radio"
            id="ends-until-radio"
            checked={ untilSelected }
            onClick={ ::this.onChooseUntil }
            />
          <label for="ends-on-input">On</label>
            {
              untilSelected ?
                <DateInput
                  name="ends-until-input"
                  value={ untilSelected ? until : null }
                  disabled={ !untilSelected }
                  onChange={ ::this.onChangeUntil } /> :
                <input type="text" disabled="true" />
            }

        </div>
      </div>
    )
  }
}

export default EndingPicker

import { h, Component } from 'preact'

import { DateInput } from '../components'
import { date } from '../utils'

class EndingPicker extends Component {
  constructor(props) {
    super(props)

    const { total, until, starts } = props

    this.until = until || starts || date.formatDate(date.now())
    this.total = total || 35
  }

  onChooseNever() {
    this.onChoose({ total: null, until: null }, { endingChoice: 'never' })
  }

  onChooseTotal() {
    const total = this.props.total || this.total

    this.onChoose({ total }, { endingChoice: 'total' })
  }

  onChooseUntil() {
    const until = this.props.until || this.until

    this.onChoose({ until }, { endingChoice: 'until' })
  }

  onChoose({ total, until }, state) {
    if (!total) total = null
    if (!until) until = null

    this.props.onChange({ total, until }, state)
  }

  onChangeTotal(event) {
    const total = event.target.value

    this.total = total
    this.onChoose({ total })
  }

  onChangeUntil(dateString) {
    const until = dateString

    this.until = until
    this.onChoose({ until })
  }

  render({ total, until, starts, className, datePicker, endingChoice }) {
    const neverSelected = endingChoice === 'never'
    const totalSelected = endingChoice === 'total'
    const untilSelected = endingChoice === 'until'

    until = until || this.until
    total = total || this.total

    return(
      <div className={ className }>
        <div className="montrose-row">
          <label for="ends-never-radio">
            <input
              type="radio"
              id="ends-never-radio"
              value="never"
              checked={ neverSelected }
              onChange={ ::this.onChooseNever }
              />
            Never
          </label>
        </div>
        <div className="montrose-row">
          <label for="ends-total-input">
            <input
              type="radio"
              id="ends-total-radio"
              value="total"
              checked={ totalSelected }
              onChange={ ::this.onChooseTotal }
              />
            After
            <input
              type="number"
              className="montrose-inline"
              name="ends-total-input"
              value={ totalSelected? total : null }
              disabled={ !totalSelected }
              onChange={ ::this.onChangeTotal }
              />
            times
          </label>
        </div>
        <div className="montrose-row">
          <label for="ends-on-input">
            <input
              type="radio"
              id="ends-until-radio"
              value="until"
              checked={ untilSelected }
              onChange={ ::this.onChooseUntil }
              />
            On
            <DateInput
              name="ends-until-input"
              className="montrose-inline"
              value={ until }
              isActive={ untilSelected }
              onChange={ ::this.onChangeUntil }
              datePicker={ datePicker }
              />
          </label>
        </div>
      </div>
    )
  }
}

EndingPicker.defaultProps = {
  endingChoice: 'never'
}

export default EndingPicker

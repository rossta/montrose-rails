import { h, Component } from 'preact'

import { DateInput } from '../components'
import { date } from '../utils'

class EndingPicker extends Component {
  constructor(props) {
    super(props)

    let answer = 'never'
    const { total, until, starts } = props

    if (total) { answer = 'total' }
    else if (until) { answer = 'until' }

    this.state = { answer }

    this.until = until || starts || date.formatDate(date.now())
    this.total = total || 35
  }

  onChooseNever() {
    this.onChoose({ total: null, until: null })
    this.setState({ answer: 'never' })
  }

  onChooseTotal() {
    const total = this.props.total || this.total

    this.onChoose({ total })
    this.setState({ answer: 'total' })
  }

  onChooseUntil() {
    const until = this.props.until || this.until

    this.onChoose({ until })
    this.setState({ answer: 'until' })
  }

  onChoose({ total, until }) {
    if (!total) total = null
    if (!until) until = null

    this.props.onChange({ total, until })
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

  render({ total, until, starts, className }, { answer }) {
    const neverSelected = !answer || answer === 'never'
    const totalSelected = answer === 'total'
    const untilSelected = answer === 'until'

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
            {
              untilSelected ?
                <DateInput
                  name="ends-until-input"
                  className="montrose-inline"
                  value={ until }
                  disabled={ !untilSelected }
                  onChange={ ::this.onChangeUntil } /> :
                <input
                  className="montrose-inline montrose-disabled-placeholder"
                  type="date"
                  disabled="true" />
            }
          </label>
        </div>
      </div>
    )
  }
}

export default EndingPicker

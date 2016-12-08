import { h, Component } from 'preact'

import { DateInput } from '../components'
import { time } from '../utils'

class EndingPicker extends Component {
  constructor(props) {
    super(props)

    let answer = 'never'
    const { total, until, starts } = props

    if (total) { answer = 'total' }
    else if (until) { answer = 'until' }

    this.state = { answer }

    this.until = until || starts || time.formateDate(time.now())
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
          <input
            type="radio"
            id="ends-never-radio"
            value="never"
            checked={ neverSelected }
            onChange={ ::this.onChooseNever }
            />
          <label for="ends-never-radio">Never</label>
        </div>
        <div className="montrose-row">
          <input
            type="radio"
            id="ends-total-radio"
            value="total"
            checked={ totalSelected }
            onChange={ ::this.onChooseTotal }
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
        <div className="montrose-row">
          <input
            type="radio"
            id="ends-until-radio"
            value="until"
            checked={ untilSelected }
            onChange={ ::this.onChooseUntil }
            />
          <label for="ends-on-input">On
            {
              untilSelected ?
                <DateInput
                  name="ends-until-input"
                  value={ untilSelected ? until : null }
                  disabled={ !untilSelected }
                  onChange={ ::this.onChangeUntil } /> :
                <input type="text" disabled="true" />
            }
          </label>
        </div>
      </div>
    )
  }
}

export default EndingPicker

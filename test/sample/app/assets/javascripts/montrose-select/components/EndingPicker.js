import { h, Component } from 'preact'

import { DateInput } from '../components'

class EndingPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      total: props.total || 35,
      until: props.until || new Date()
    }
  }

  onChooseNever() {
    this.props.onChange({ })
  }

  onChooseTotal() {
    this.onChange({ total: this.state.total })
  }

  onChooseUntil() {
    this.onChange({ until: this.state.until })
  }

  onChangeTotal(event) {
    onChange({ total: event.target.value })
  }

  onChangeUntil(date) {
    this.onChange({ until: date })
  }

  onChange({ total, until }) {
    if (!total) total = null
    if (!until) until = null

    this.props.onChange({ total, until })
  }

  render({ total, until }) {
    const neverSelected = !(total || until)
    const totalSelected = !!total && !neverSelected
    const untilSelected = !!until && !neverSelected

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
              value={ total }
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
                  value={ until }
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

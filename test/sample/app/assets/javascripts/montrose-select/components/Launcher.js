import { h, Component } from 'preact'

import { Menu } from '../components'
import { time } from '../utils'

class Launcher extends Component {
  constructor(props) {
    super(props)

    const { recurrence } = props

    this.state = {
      isEditing: false,
      isEnabled: (recurrence && Object.keys(recurrence).length),
      recurrence: recurrence || {},
    }
  }

  toggle(event) {
    event.preventDefault()

    const { isEnabled } = this.state

    if (isEnabled) {
      this.setState({ isEnabled: false, isEditing: false })
    } else {
      this.launch(event)
    }
  }

  launch(event) {
    if (event) { event.preventDefault() }

    this.setState({ isEditing: true })

    this.props.onChange(this.getRecurrence())
  }

  abort() {
    this.close()
  }

  close() {
    this.setState({ isEditing: false })
  }

  updateRecurrence(newRecurrence) {
    const recurrence = Object.assign(this.getRecurrence(), newRecurrence)

    this.setState({ recurrence })

    this.props.onChange(this.state.recurrence)
  }

  saveRecurrence() {
    const recurrence = this.getRecurrence()
    const isEnabled = Object.keys(recurrence).length

    this.setState({ recurrence, isEnabled })

    this.props.onChange(this.state.recurrence)
    this.props.onFinish(this.state.recurrence)

    this.close()
  }

  getRecurrence() {
    return Object.assign(
      Launcher.defaultProps.recurrence,
      this.state.recurrence,
      this.props.recurrence
    )
  }

  render({ label, children }, { isEditing, isEnabled }) {
    const recurrence = this.getRecurrence()
    const isChecked = isEditing || isEnabled

    return (
      <div className="montrose-launcher">
        <label >
          <input
            type="checkbox"
            checked={ isChecked }
            onChange={ ::this.toggle } />
          { children }
        </label>
        {
          isEnabled ?
            <a href="#" onClick={ ::this.launch }>Edit</a> :
            ''
        }
        {
          isEditing ?
            <Menu
              recurrence={ recurrence || undefined }
              onCancel={ ::this.abort }
              onChange={ ::this.updateRecurrence }
              onSubmit={ ::this.saveRecurrence }
              /> :
            ''
        }
      </div>
    )
  }
}

Launcher.defaultProps = {
  recurrence: {
    frequency: 'week',
    interval: 3,
    starts: time.formatDate(time.now()),
    total: null,
    until: null,
  },
  onChange: () => {},
  onFinish: () => {}
}

export default Launcher

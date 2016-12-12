import { h, Component } from 'preact'

import { Menu } from '../components'
import { time, object } from '../utils'

class Launcher extends Component {
  constructor(props) {
    super(props)

    let { recurrence } = props
    recurrence = recurrence || {}
    const isEnabled = !!Object.keys(recurrence).length
    recurrence = object.merge(props.defaultRecurrence, recurrence)

    this.state = {
      ...recurrence,
      isEnabled,
      isEditing: false,
    }
  }

  componentWillMount() {
    const { $select } = this.props

    $select.didSetState = (state) => {
      console.log('Updating external state', state)
      this.setState(state)
    }
  }

  toggle(event) {
    event.preventDefault()

    const { isEnabled } = this.state

    if (isEnabled) {
      this.setState({ isEnabled: false, isEditing: false })
      this.props.onFinish(null)
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

  updateRecurrence(recurrence) {
    this.setState(recurrence)
    this.props.onChange(this.getRecurrence())
  }

  saveRecurrence() {
    const recurrence = this.getRecurrence()

    this.setState({...recurrence, isEnabled: true })
    this.props.onChange(recurrence)
    this.props.onFinish(recurrence)
    this.close()
  }

  getRecurrence() {
    const state = this.state
    const keys = Object.keys(Launcher.defaultProps.defaultRecurrence)

    return keys.reduce((recurrence, prop) => {
      recurrence[prop] = state[prop]
      return recurrence
    }, {})
  }

  render({ label, children },
         { isEditing, isEnabled }) {
    const isChecked = isEditing || isEnabled
    const recurrence = this.getRecurrence()

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
              { ...recurrence }
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
  defaultRecurrence: {
    frequency: 'week',
    interval: 3,
    starts: time.formatDate(time.now()),
    total: null,
    until: null,
    day: null,
  },
  onChange: () => {},
  onFinish: () => {}
}

export default Launcher

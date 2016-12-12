import { h, Component } from 'preact'

import { Menu, LauncherLabel } from '../components'
import { date, object } from '../utils'

class Root extends Component {
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
    const { $app } = this.props

    $app.didSetState = (state) => {
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

  onCancel(event) {
    event && event.preventDefault()

    this.close()
  }

  close() {
    this.setState({ isEditing: false })
  }

  onSubmit(event) {
    event && event.preventDefault()

    const recurrence = this.getRecurrence()

    this.setState({...recurrence, isEnabled: true })
    this.props.onChange(recurrence)
    this.props.onFinish(recurrence)
    this.close()
  }

  updateRecurrence(recurrence, state) {
    this.setState({...recurrence, ...state})
    this.props.onChange(this.getRecurrence())
  }

  getRecurrence() {
    const state = this.state
    const keys = Object.keys(Root.defaultProps.defaultRecurrence)

    return keys.reduce((recurrence, prop) => {
      recurrence[prop] = state[prop]
      return recurrence
    }, {})
  }

  renderMenu(recurrence, { datePicker, isEditing, endingChoice }) {
    if (!isEditing) {
      return ''
    }

    return <Menu
      { ...recurrence }
      datePicker={ datePicker }
      endingChoice={ endingChoice }
      onChange={ ::this.updateRecurrence }
      onSubmit={ ::this.onSubmit }
      onCancel={ ::this.onCancel }
      />

  }

  render({ children, datePicker },
         { isEditing, isEnabled, endingChoice }) {
    const isChecked = isEditing || isEnabled
    const recurrence = this.getRecurrence()

    return (
      <div className="montrose-root">
        <LauncherLabel
          isChecked={ isChecked }
          isEnabled={ isEnabled }
          onChange={ ::this.toggle }
          onLaunch={ ::this.launch }
        >
          { children }
        </LauncherLabel>

        { this.renderMenu(recurrence, { datePicker, endingChoice, isEditing }) }
      </div>
    )
  }
}

Root.defaultProps = {
  defaultRecurrence: {
    frequency: 'week',
    interval: 3,
    starts: date.formatDate(date.now()),
    total: null,
    until: null,
    day: null,
  },
  datePicker: null,
  onChange: () => {},
  onFinish: () => {}
}

export default Root

import { h, Component } from 'preact'

import { Menu } from '../components'

class Launcher extends Component {
  constructor(props) {
    super(props)

    const { recurrence } = props

    this.state = {
      isEditing: false,
      isEnabled: (recurrence && Object.keys(recurrence).length),
      recurrence: recurrence,
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
  }

  abort() {
    this.close()
  }

  close() {
    this.setState({ isEditing: false })
  }

  updateRecurrence(newRecurrence) {
    const oldRecurrence = this.state.recurrence || {}
    const recurrence = Object.assign(oldRecurrence, newRecurrence)

    this.setState({ recurrence })

    console.log('Recurrence updated:', this.state.recurrence)
  }

  saveRecurrence() {
    const recurrence = this.state.recurrence || {}
    const isEnabled = Object.keys(recurrence).length

    this.setState({ recurrence, isEnabled })

    console.log('Recurrence saved:', this.state.recurrence)

    this.close()
  }

  render({ label, children }, { recurrence, isEditing, isEnabled }) {
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
              recurrence={ recurrence }
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

export default Launcher

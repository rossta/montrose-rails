import { h, render } from 'preact'

import { Launcher } from './components'

import { object } from './utils'

class MontroseSelect {
  constructor(options) {
    this.options = options || {}
    this.options = object.merge(this.options, { $select: this })

    options = options || this.options

    this.target = options.target

    this.root = render(
      <Launcher {...options}>
        Repeat...
      </Launcher>,
      this.target
    )
  }

  set(options = {}) {
    this.options = object.merge(this.options, options)

    if (this.root) {
      this.didSetState(options)
    }
  }

  didSetState() {
    // placeholder funciton
  }
}

export default MontroseSelect

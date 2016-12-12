import { h, render } from 'preact'

import { Root } from './components'

import { object } from './utils'

class MontroseSelect {
  constructor(options) {
    this.options = options || {}
    this.options = object.merge(this.options, { $app: this })

    options = options || this.options

    this.target = options.target

    this.root = render(
      <Root {...options}>
        Repeat...
      </Root>,
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
    // template function
  }
}

export default MontroseSelect

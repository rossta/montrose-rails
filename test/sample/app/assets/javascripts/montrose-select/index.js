import { h, render } from 'preact'

import { Root } from './components'

import { object } from './utils'

class MontroseSelect {
  constructor(options) {
    this.options = options || {}
    this.options = object.merge(this.options, { $app: this })

    options = options || this.options

    this.target = options.target

    if (!this.target) {
      throw `Expected MontroseSelect options to define a 'target', but it was ${options.target}`
    }

    const innerHTML = this.target.innerHTML || "Repeat..."
    this.target.innerHTML = ""

    this.root = render(
      <Root {...options}>
        {innerHTML}
      </Root>,
      this.target
    )

    window.rootMontrose = this.root
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

import { h, render } from 'preact'

import { Root } from './components'

import { date } from './utils'

class MontroseSelect {
  constructor(options) {
    this.options = options || {}
    this.options = Object.assign(this.options, { $app: this })
    this.target = options.target

    if (!this.target) {
      throw `Expected MontroseSelect options to define a 'target', but it was ${options.target}`
    }

    const innerHTML = this.target.innerHTML || "Repeat..."
    this.target.innerHTML = ""

    this.root = render(
      <Root {...this.options}>
        {innerHTML}
      </Root>,
      this.target
    )

    window.rootMontrose = this.root
  }

  set(options = {}) {
    let normalizedOptions = options || {}

    if (options.starts) {
      normalizedOptions = Object.assign(options, { starts: date.normalizeDateString(options.starts) })
    }

    if (options.until) {
      normalizedOptions = Object.assign(options, { until: date.normalizeDateString(options.until) })
    }

    if (this.root) {
      this.didSetState(normalizedOptions)
    }
  }

  didSetState() {
    // template function
  }
}

export default MontroseSelect

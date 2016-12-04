import { h, render } from 'preact'

import Launcher from './Launcher'

function MontroseSelect(options) {
  render(
    <Launcher
      recurrence={options.recurrence}
      >Repeat...
    </Launcher>,
    options.target
  )
}

export default MontroseSelect

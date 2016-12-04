import { h, render } from 'preact'

import { Launcher } from './components'

export default function(options) {
  render(
    <Launcher
      recurrence={options.recurrence}
      >Repeat...
    </Launcher>,
    options.target
  )
}

import { h, render } from 'preact'

import { Launcher } from './components'

export default function(options) {
  return render(
    <Launcher {...options}>
      Repeat...
    </Launcher>,
    options.target
  )
}

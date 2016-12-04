import MontroseSelect from './montrose-select'

window.addEventListener('load', () => {
  new MontroseSelect({
    target: document.querySelector('.montrose'),
    data: {
      launchLabel: 'Repeat...',
      recurrence: null
    }
  })
})

import MontroseSelect from './montrose-select'
import { json, object } from './montrose-select/utils'

const targetSelector = '.montrose'
const inputSelector = '[name="event[recurrence_json]"]'

window.addEventListener('load', () => {
  const input = document.querySelector(inputSelector)

  if (!input) { return }

  const recurrence = json.parse(input.value)

  new MontroseSelect({
    recurrence: recurrence,

    target: document.querySelector(targetSelector),

    onChange: (recurrence) => {
      console.log('Recurrence changed', recurrence)
    },

    onFinish: (recurrence) => {
      console.log('Recurrence saved', recurrence)
      $(inputSelector).val(json.stringify(recurrence))
    }
  })
})

import Flatpickr from 'flatpickr'

import MontroseSelect from './montrose-select'
import { json, object, $ } from './montrose-select/utils'

const targetSelector = '.montrose-select'
const inputSelector = '[name="event[recurrence_json]"]'
const startsAtSelector = '[name="event[starts_at]"]'
const endsAtSelector = '[name="event[ends_at]"]'

window.addEventListener('load', () => {
  const recurrenceInput = $(inputSelector)

  if (!recurrenceInput) { return }

  const recurrence = json.parse(recurrenceInput.value)

  const target = $(targetSelector)
  const startsAtInput = $(startsAtSelector)
  const endsAtInput = $(endsAtSelector)

  const recurringSelect = new MontroseSelect({
    recurrence: recurrence,

    target: target,

    onChange: (recurrence) => {
      console.log('Recurrence changed', recurrence)
    },

    onFinish: (recurrence) => {
      console.log('Recurrence saved', recurrence)
      recurrenceInput.value = json.stringify(recurrence)
    },

    // datePicker: {
    //   type: "text",
    //   onReady: (input) => {
    //     return new Flatpickr(input)
    //   }
    // }
  })

  new Flatpickr(startsAtInput, {
    enableTime: true,

    onChange: (_selectedDates, startsAtStr, instance) => {
      recurringSelect.set({ starts: startsAtStr })
    },
  });

  new Flatpickr(endsAtInput, {
    enableTime: true,
  });
})

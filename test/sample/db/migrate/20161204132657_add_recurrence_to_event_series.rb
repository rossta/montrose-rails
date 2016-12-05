class AddRecurrenceToEventSeries < ActiveRecord::Migration[5.0]
  def change
    add_column :event_series, :recurrence, :text, null: false
  end
end

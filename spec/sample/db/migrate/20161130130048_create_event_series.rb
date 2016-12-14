# frozen_string_literal: true
class CreateEventSeries < ActiveRecord::Migration[5.0]
  def change
    create_table :event_series do |t|
      t.string :name
      t.date :start_date
      t.datetime :starts_at
      t.date :end_date
      t.datetime :ends_at
      t.text :recurrence, null: false

      t.timestamps
    end
  end
end

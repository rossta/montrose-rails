class Event < ApplicationRecord
  belongs_to :event_series, optional: true

  validates :name, presence: true
  validates :starts_at, presence: true
  validates :ends_at, presence: true

  def start_time
    starts_at
  end
end

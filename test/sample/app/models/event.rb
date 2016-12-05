class Event < ApplicationRecord
  belongs_to :event_series, optional: true

  delegate :recurrence, to: :event_series, allow_nil: true
  delegate :recurrence=, to: :ensure_event_series

  validates :name, presence: true
  validates :starts_at, presence: true
  validates :ends_at, presence: true

  before_save :save_event_series,
    if: ->(e) { e.event_series.present? && e.event_series.changed? }

  def start_time
    starts_at
  end

  def recurrence_json
    # Use recurrence logic to parse recurrence rather than really on Rails
    # event_series.read_attribute_before_type_cast :recurrence
    recurrence.presence && recurrence.to_json
  end

  def recurrence_json=(obj)
    recurrence = Montrose::Recurrence.load(obj)

    ensure_event_series.recurrence = recurrence if recurrence
  end

  private

  def ensure_event_series
    event_series || build_event_series
  end

  def save_event_series
    event_series.save
  end
end

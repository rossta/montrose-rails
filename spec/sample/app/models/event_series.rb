# frozen_string_literal: true
class EventSeries < ApplicationRecord
  serialize :recurrence, Montrose::Recurrence

  def start_time
    starts_at
  end
end

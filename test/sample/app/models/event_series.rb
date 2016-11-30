class EventSeries < ApplicationRecord
  def start_time
    starts_at
  end
end

require "rails_helper"

class Montrose::ModelTest < Minitest::Test
  include Rack::Test::Methods

  def app
    ::Rails.application
  end

  def setup
    get "/"
  end

  def test_event
    event = Event.create(name: "A recurring event")
    assert event.name, "A recurring shevent"
  end
end

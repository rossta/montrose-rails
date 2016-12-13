require "rails_helper"

RSpec.feature "Edit event recurrence" do
  scenario "create event" do
    visit root_path

    expect(page).to have_content "Events"

    click_link "New Event"

    fill_in "Name", with: "NYC.rb meetup"

    set_date "Starts at", "2016-12-13 7:00PM"
    set_date "Ends at", "2016-12-13 9:00PM"

    click_button "Create Event"

    expect(page).to have_content "NYC.rb meetup"
    #
    # expect(Event.count).to eq 1
    # event = Event.last
    # expect(event.name).to eq "NYC.rb meetup"
  end

  scenario "add recurrence" do
    Event.create(name: "Foo", starts_at: Date.today, ends_at: Date.tomorrow)

    visit root_path

    expect(page).to have_content "Events"

    click_link "New Event"

    fill_in "Name", with: "NYC.rb meetup"

    set_date "Starts at", "2016-12-13 7:00PM"
    set_date "Ends at", "2016-12-13 9:00PM"

    check "Repeat this event..."

    select "Monthly"
    select "1"
    choose "ends-total-radio"
    fill_in "ends-total-input", with: 4
    click_button "Done"

    click_button "Create Event"

    expect(page).to have_content "success"

    click_link "NYC.rb meetup"

    expect(page).to have_content("Every: month")
    expect(page).to have_content("Interval: 1")
    expect(page).to have_content("Starts: 13 Dec 00:00")
    expect(page).to have_content("Total: 4")
  end

  def set_date(label, value)
    name = label.downcase.gsub(/\s+/, '-')
    page.execute_script("window.Pickers['#{name}'].setDate('#{value}')")
  end
end

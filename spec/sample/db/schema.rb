# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161130135935) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "event_series", force: :cascade do |t|
    t.string   "name"
    t.date     "start_date"
    t.datetime "starts_at"
    t.date     "end_date"
    t.datetime "ends_at"
    t.text     "recurrence", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string   "name"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.integer  "event_series_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["event_series_id"], name: "index_events_on_event_series_id", using: :btree
  end

  add_foreign_key "events", "event_series"
end

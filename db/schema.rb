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

ActiveRecord::Schema.define(version: 0) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alembic_version", primary_key: "version_num", id: :string, limit: 32, force: :cascade do |t|
  end

  create_table "user", force: :cascade do |t|
    t.datetime "updated_at",             null: false
    t.string   "email",      limit: 80,  null: false
    t.string   "password",   limit: 128, null: false
    t.datetime "created_at",             null: false
    t.string   "name",       limit: 80
    t.index ["email"], name: "user_email_key", unique: true, using: :btree
  end

end

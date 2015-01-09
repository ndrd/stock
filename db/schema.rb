# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150109045252) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: true do |t|
    t.text     "hush"
    t.text     "code",        null: false
    t.text     "description", null: false
    t.float    "sale",        null: false
    t.float    "cost",        null: false
    t.float    "stock",       null: false
    t.float    "rank",        null: false
    t.integer  "category",    null: false
    t.text     "slug"
    t.datetime "last_check"
  end

  create_table "logins", id: false, force: true do |t|
    t.text     "username"
    t.text     "secret",     null: false
    t.datetime "last_login", null: false
  end

  create_table "sales", id: false, force: true do |t|
    t.integer "id",     default: "nextval('sales_id_seq'::regclass)", null: false
    t.text    "hush",                                                 null: false
    t.integer "ticket"
  end

  create_table "ticket", force: true do |t|
    t.text     "username",       null: false
    t.datetime "check_out_date"
    t.float    "total",          null: false
    t.integer  "items",          null: false
  end

  add_index "ticket", ["id"], name: "ticket_id_key", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.text     "name"
    t.datetime "last_check"
    t.text     "slug"
    t.text     "username",                 null: false
    t.float    "rank",       default: 0.0, null: false
  end

  add_index "users", ["username"], name: "users_username_key", unique: true, using: :btree

end

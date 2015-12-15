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

ActiveRecord::Schema.define(version: 20150112041604) do

  create_table "categories", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "items", id: false, force: true do |t|
    t.text      "hush"
    t.text      "code",                   null: false
    t.text      "description",            null: false
    t.float     "sale",        limit: 53, null: false
    t.float     "cost",        limit: 53, null: false
    t.float     "stock",       limit: 53, null: false
    t.float     "rank",        limit: 53, null: false
    t.integer   "category",               null: false
    t.text      "slug"
    t.timestamp "last_check",             null: false
    t.integer   "id",                     null: false
  end

  create_table "logins", id: false, force: true do |t|
    t.text      "username"
    t.text      "secret",     null: false
    t.timestamp "last_login", null: false
  end

  create_table "reports", id: false, force: true do |t|
    t.integer   "id",                    null: false
    t.timestamp "updated_at",            null: false
    t.date      "day"
    t.float     "total",      limit: 53, null: false
    t.float     "items",      limit: 53, null: false
    t.text      "username",              null: false
    t.text      "slug"
  end

  create_table "sales", id: false, force: true do |t|
    t.integer "id",     null: false
    t.text    "hush",   null: false
    t.integer "ticket"
  end

  create_table "tickets", id: false, force: true do |t|
    t.text      "username",                  null: false
    t.timestamp "check_out_date",            null: false
    t.float     "total",          limit: 53, null: false
    t.integer   "items",                     null: false
    t.integer   "id",                        null: false
  end

  create_table "users", id: false, force: true do |t|
    t.integer   "id",                                  null: false
    t.text      "name"
    t.timestamp "last_check",                          null: false
    t.text      "slug"
    t.text      "username",                            null: false
    t.float     "rank",       limit: 53, default: 0.0, null: false
  end

end

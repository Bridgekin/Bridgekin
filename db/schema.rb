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

ActiveRecord::Schema.define(version: 2019_01_02_193751) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "connected_opportunities", force: :cascade do |t|
    t.integer "opportunity_id", null: false
    t.integer "user_id", null: false
    t.integer "facilitator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "network_id"
    t.integer "#<ActiveRecord::ConnectionAdapters::PostgreSQL::TableDefinition"
    t.index ["opportunity_id"], name: "index_connected_opportunities_on_opportunity_id"
    t.index ["user_id"], name: "index_connected_opportunities_on_user_id"
  end

  create_table "finalized_opportunities", force: :cascade do |t|
    t.integer "opportunity_id", null: false
    t.integer "user_id", null: false
    t.integer "facilitator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "network_id"
    t.integer "#<ActiveRecord::ConnectionAdapters::PostgreSQL::TableDefinition"
    t.index ["opportunity_id"], name: "index_finalized_opportunities_on_opportunity_id", unique: true
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "opportunities", force: :cascade do |t|
    t.integer "owner_id", null: false
    t.string "title", null: false
    t.text "description"
    t.string "opportunity_needs", null: false
    t.string "industries", null: false, array: true
    t.string "geography", null: false, array: true
    t.string "value", null: false
    t.string "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id", "title"], name: "index_opportunities_on_owner_id_and_title", unique: true
    t.index ["owner_id"], name: "index_opportunities_on_owner_id"
  end

  create_table "referral_links", force: :cascade do |t|
    t.string "referral_code", null: false
    t.integer "member_id", null: false
    t.integer "network_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id", "network_id"], name: "index_referral_links_on_member_id_and_network_id", unique: true
    t.index ["referral_code"], name: "index_referral_links_on_referral_code"
  end

  create_table "saved_opportunities", force: :cascade do |t|
    t.integer "opportunity_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "network_id"
    t.integer "#<ActiveRecord::ConnectionAdapters::PostgreSQL::TableDefinition"
    t.index ["opportunity_id", "user_id"], name: "index_saved_opportunities_on_opportunity_id_and_user_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "phone", default: "", null: false
    t.string "city", default: "", null: false
    t.string "state", default: "", null: false
    t.string "country", default: "", null: false
    t.boolean "is_admin", default: false, null: false
    t.date "email_sent_at"
    t.date "email_confirmed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "authentication_token", limit: 30
    t.string "unconfirmed_email"
    t.string "membership_type", default: "full", null: false
    t.integer "referred_by_id"
    t.string "fname", null: false
    t.string "lname", null: false
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "waitlist_users", force: :cascade do |t|
    t.string "email", null: false
    t.date "email_sent_at"
    t.string "from_referral_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "fname", null: false
    t.string "lname", null: false
    t.index ["email"], name: "index_waitlist_users_on_email", unique: true
  end

end

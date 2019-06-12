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

ActiveRecord::Schema.define(version: 2019_06_11_234650) do

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

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
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
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "circle_connections", force: :cascade do |t|
    t.integer "circle_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "connection_id"
    t.index ["circle_id"], name: "index_circle_connections_on_circle_id"
  end

  create_table "circles", force: :cascade do |t|
    t.string "title"
    t.integer "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_circles_on_owner_id"
  end

  create_table "connected_opportunities", force: :cascade do |t|
    t.integer "opportunity_id", null: false
    t.integer "user_id"
    t.integer "facilitator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "#<ActiveRecord::ConnectionAdapters::PostgreSQL::TableDefinition"
    t.string "perm_type"
    t.index ["opportunity_id"], name: "index_connected_opportunities_on_opportunity_id"
    t.index ["user_id"], name: "index_connected_opportunities_on_user_id"
  end

  create_table "connections", force: :cascade do |t|
    t.integer "user_id"
    t.integer "friend_id"
    t.string "status", default: "Pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id"], name: "index_connections_on_friend_id"
    t.index ["user_id"], name: "index_connections_on_user_id"
  end

  create_table "direct_links", force: :cascade do |t|
    t.string "link_code", null: false
    t.string "opportunity_ids", array: true
    t.integer "profile_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["link_code"], name: "index_direct_links_on_link_code"
  end

  create_table "email_logs", force: :cascade do |t|
    t.integer "recipient_id"
    t.string "email_type"
    t.integer "sender_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipient_id"], name: "index_email_logs_on_recipient_id"
  end

  create_table "email_notifications", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "notification_setting", default: "Weekly", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_email_notifications_on_user_id", unique: true
  end

  create_table "email_templates", force: :cascade do |t|
    t.string "template_type", null: false
    t.string "subject", default: ""
    t.text "body", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["template_type"], name: "index_email_templates_on_template_type"
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

  create_table "network_admins", force: :cascade do |t|
    t.integer "network_id", null: false
    t.integer "admin_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["network_id", "admin_id"], name: "index_network_admins_on_network_id_and_admin_id", unique: true
  end

  create_table "networks", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "subtitle", default: ""
    t.integer "parent_id"
    t.integer "workspace_id"
  end

  create_table "notification_settings", force: :cascade do |t|
    t.integer "user_id"
    t.boolean "opps_shared_direct", default: true
    t.boolean "opps_shared_contacts", default: true
    t.boolean "opps_shared_communities", default: true
    t.boolean "invites_requested", default: true
    t.boolean "opps_acknowledged", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "email_opps_shared_direct", default: true
    t.boolean "email_invites_requested", default: true
    t.boolean "email_opps_shared_contacts", default: true
    t.boolean "email_opps_shared_communities", default: true
    t.string "email_recap_shared_contacts", default: "Never"
    t.string "email_recap_shared_communities", default: "Weekly"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "recipient_id"
    t.integer "actor_id"
    t.string "action"
    t.string "acted_with_type"
    t.bigint "acted_with_id"
    t.string "targetable_type"
    t.bigint "targetable_id"
    t.datetime "read_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "message", default: ""
    t.string "origin_type"
    t.bigint "origin_id"
    t.boolean "anonymous", default: false
    t.index ["acted_with_type", "acted_with_id"], name: "index_notifications_on_acted_with_type_and_acted_with_id"
    t.index ["origin_type", "origin_id"], name: "index_notifications_on_origin_type_and_origin_id"
    t.index ["recipient_id"], name: "index_notifications_on_recipient_id"
    t.index ["targetable_type", "targetable_id"], name: "index_notifications_on_targetable_type_and_targetable_id"
  end

  create_table "opp_permissions", force: :cascade do |t|
    t.string "shareable_type"
    t.bigint "shareable_id"
    t.integer "opportunity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "mass", default: false
    t.index ["shareable_type", "shareable_id"], name: "index_opp_permissions_on_shareable_type_and_shareable_id"
  end

  create_table "opportunities", force: :cascade do |t|
    t.integer "owner_id", null: false
    t.string "title", default: "", null: false
    t.text "description"
    t.string "opportunity_need", default: "", null: false
    t.string "industries", default: [], null: false, array: true
    t.string "geography", default: [], null: false, array: true
    t.string "value", default: "", null: false
    t.string "status", default: "Pending", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "deal_status", default: "Active", null: false
    t.boolean "anonymous", default: true
    t.string "view_type", default: "card", null: false
    t.index ["owner_id"], name: "index_opportunities_on_owner_id"
  end

  create_table "opportunity_networks", force: :cascade do |t|
    t.integer "network_id", null: false
    t.integer "opportunity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["network_id", "opportunity_id"], name: "index_opportunity_networks_on_network_id_and_opportunity_id", unique: true
  end

  create_table "passed_opportunities", force: :cascade do |t|
    t.integer "user_id"
    t.integer "opportunity_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_passed_opportunities_on_user_id"
  end

  create_table "ref_applications", force: :cascade do |t|
    t.string "fname"
    t.string "lname"
    t.string "email"
    t.text "answer_1"
    t.string "referral_code"
    t.integer "ref_opp_id"
    t.integer "direct_referrer_id"
    t.integer "candidate_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "question_1"
    t.string "status", default: "open"
    t.boolean "has_license", default: false
    t.boolean "allows_screening", default: false
    t.string "availability", default: ""
    t.string "phone_number", default: ""
    t.index ["ref_opp_id"], name: "index_ref_applications_on_ref_opp_id"
  end

  create_table "ref_opp_events", force: :cascade do |t|
    t.integer "owner_id"
    t.string "logged_out_email"
    t.string "event"
    t.integer "ref_opp_id"
    t.integer "ref_opp_link_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ref_opp_links", force: :cascade do |t|
    t.integer "owner_id"
    t.string "link_code", null: false
    t.integer "ref_opp_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ref_opportunities", force: :cascade do |t|
    t.integer "owner_id"
    t.string "url"
    t.string "title"
    t.text "description"
    t.string "company"
    t.string "interview_incentive"
    t.string "hire_incentive"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "city"
    t.string "state"
    t.string "compensation"
    t.string "status", default: "open"
    t.string "type_of_position"
    t.integer "views"
    t.index ["owner_id"], name: "index_ref_opportunities_on_owner_id"
  end

  create_table "referral_links", force: :cascade do |t|
    t.string "referral_code", null: false
    t.integer "member_id", null: false
    t.integer "network_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "recipient_id"
    t.string "status", default: "Active", null: false
    t.string "usage_type", default: "Single", null: false
    t.boolean "is_friendable", default: true
    t.index ["member_id"], name: "index_referral_links_on_member_id"
    t.index ["recipient_id"], name: "index_referral_links_on_recipient_id"
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

  create_table "site_templates", force: :cascade do |t|
    t.string "name"
    t.integer "network_id", null: false
    t.boolean "test_feature", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "base1"
    t.string "base2"
    t.string "base3"
    t.string "base4"
    t.string "font1"
    t.string "font2"
    t.string "button1"
    t.string "button2"
    t.string "border1"
    t.string "border2"
    t.string "base5"
    t.string "font3"
    t.index ["network_id"], name: "index_site_templates_on_network_id"
  end

  create_table "user_features", force: :cascade do |t|
    t.integer "user_id"
    t.datetime "tutorial_tour_date"
    t.integer "tutorial_tour_step", default: 0
    t.datetime "user_onboarding"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "tutorial_tour_session"
    t.boolean "hire_user", default: false
    t.datetime "initial_posting_date"
    t.datetime "imported_social"
    t.index ["user_id"], name: "index_user_features_on_user_id"
  end

  create_table "user_networks", force: :cascade do |t|
    t.integer "network_id", null: false
    t.integer "member_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["network_id", "member_id"], name: "index_user_networks_on_network_id_and_member_id", unique: true
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
    t.string "phone_number", default: "", null: false
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
    t.string "title", default: "", null: false
    t.string "company", default: "", null: false
    t.integer "default_network_id"
    t.integer "invites_remaining", default: 3
    t.boolean "searchable", default: true
    t.string "linked_in_url", default: ""
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "waitlist_user_referrals", force: :cascade do |t|
    t.integer "waitlist_user_id", null: false
    t.integer "from_referral_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["waitlist_user_id"], name: "index_waitlist_user_referrals_on_waitlist_user_id"
  end

  create_table "waitlist_users", force: :cascade do |t|
    t.string "email", null: false
    t.date "email_sent_at"
    t.string "from_referral_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "fname", null: false
    t.string "lname"
    t.string "status", default: "Waitlist", null: false
    t.index ["email"], name: "index_waitlist_users_on_email", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end

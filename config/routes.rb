Rails.application.routes.draw do

  root to: 'static_pages#root'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # namespace :api, default: {format: :json} do
  namespace :api, format: :json do
    resources :opportunities
    resources :networks
    resources :connected_opportunities
    resources :finalized_opportunities
    resources :saved_opportunities
    resource :waitlist_user, only: [:create, :destroy]
    resources :referral_links, only: [:create]
    resource :email_notifications, only: [:create, :show]
    resources :users, only: [:show, :update, :destroy]
    resources :network_admins, only: [:index]
    resources :member_users, only: [:index, :show, :create, :update, :destroy]
    resources :opp_permissions, only: [:index, :create, :destroy]
    resources :connections
    resources :circles do
      post 'add_member/:connection_id', :to => 'circles#add_member'
    end
    delete 'circle_connections/:circle_connection_id', :to => 'circles#remove_member'
    resources :notifications, only: [:index]
    resource :notification_settings, only: [:show, :update]
    resource :email_templates, only: [:show]
    resource :direct_links, only: [:create, :show]
    resource :passed_opportunities, only: [:create, :destroy]
    get 'passed_opportunities', :to => 'passed_opportunities#index'
    resources :user_metrics, only: [:index]
    resources :user_features, only: [:update]
    resources :ref_opportunities
    resources :ref_applications
    resource :ref_opp_link, only: [:create]
    resources :sales_networks, only: [:index]
    resources :sales_intros
    resource :admin_signup_links, only: [:show]
    resources :sales_network_invites
    resources :request_templates, only: [:index, :create]
    # resource :users, only: [] do
    #   resource :user, only: [:update, :destroy]
    # end
    # resource :session, only: [:create, :destroy]
    post "network_invite_signup", :to => 'users#network_invite_signup'
    get "get_network_invite_code", :to => 'sales_network_invites#show_by_referral_code'
    get "public_env_variables", :to => 'utils#public_env_variables'
    get "search_sales_networks", :to => 'sales_networks#search_networks'
    post 'validate_unique', :to => "utils#validate_unique"
    post "charge", :to => "stripe#charge"
    post "admin_signup", :to => 'users#admin_signup'
    get "webhooks/clearbit", :to => 'webhooks#clearbit'
    post "webhooks/full_contact_company", :to => 'webhooks#full_contact_company'
    post "webhooks/full_contact_people", :to => 'webhooks#full_contact_people'
    post "google_sales_signup", :to => 'users#google_sales_signup'
    patch "respond_intro_request", :to => 'sales_intros#respond_intro_request'
    post "sales_contacts/search", :to => 'sales_contacts#search'
    # get "sales_contacts/search_by_name", :to => 'sales_contacts#search_by_name'
    # get "sales_contacts/search_by_characteristic", :to => 'sales_contacts#search_by_characteristic'
    get "sales_contacts/presigned_url", :to => 'sales_contacts#presigned_url'
    post "sales_contacts/connect_social", :to => 'sales_contacts#connect_social'
    post "sales_signup", :to => 'users#sales_signup'
    post 'notify_request_demo', :to => "utils#request_demo"
    patch 'update_ref_app_status', :to => 'ref_applications#update_status'
    post "hire_signup", :to => 'users#hire_signup'
    post 'add_external_user', :to => 'users#add_external_user'
    get 'third_parties/google_contacts', :to => 'third_parties#google_contacts'
    delete 'destroy_user_connected_opps', :to => 'connected_opportunities#destroy_user_connected_opps'
    delete 'destroy_all_user_opps', :to => 'opportunities#delete_all_user_opps'
    delete 'destroy_user_by_email', :to => 'users#destroy_by_email'
    get 'profile_index', :to => 'opportunities#profile_index'
    get 'connected_opportunity_template', :to => 'email_templates#connected_opportunity'
    get 'waitlist_referral_template', :to => 'email_templates#waitlist_referral'
    patch 'read_all', :to => 'notifications#read_all'
    get 'search_bar', :to => 'users#search_bar'
    get 'opp_permissions/share_options', :to => 'opp_permissions#shareOptions'
    post 'waitlist_user/create_with_referral', :to => 'waitlist_users#create_with_referral'
    post 'member_users/:id/referral/:referral_code', :to => 'member_users#add_by_referral'
    get 'workspace_networks/:network_id', :to => 'networks#workspaceIndex'
    get 'site_templates/:network_id', :to => 'site_templates#show'
    get 'all_touched_opportunities', :to => 'opportunities#all_touched_index'
    get 'user_opportunities', :to => 'opportunities#user_index'
    get 'authorization', :to => 'users/sessions#authorize'
    get 'show', :to => 'users/sessions#show'
    get 'referral_links/:referral_code', :to => 'referral_links#reveal'
    get 'referred_connection', :to => 'connected_opportunities#referredConnection'

    # devise_for :users, only: []
    devise_for :users,
      path: '',
      path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
      },
      controllers: {
        registrations: "api/users/registrations",
        sessions: "api/users/sessions",
        passwords: "api/users/passwords",
        confirmations: "api/users/confirmations"
        # invitations: "api/users/invitations",
         # password_expired: "api/users/password_expired"
      }

    devise_scope :api_user do
      get 'reconfirm', :to => 'users/confirmations#reconfirm', :as => 'reconfirm'
    end
  end

  # get '*path', :to => ''
  # get '*path', :to => 'static_pages#root'
  # get '*path' => redirect('/')

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end

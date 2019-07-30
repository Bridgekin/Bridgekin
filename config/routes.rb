Rails.application.routes.draw do

  root to: 'static_pages#root'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # namespace :api, default: {format: :json} do
  namespace :api, format: :json do
    resource :waitlist_user, only: [:create, :destroy]
    resources :users, only: [:show, :update, :destroy]
    resources :notifications, only: [:index]
    resource :notification_settings, only: [:show, :update]
    resources :user_metrics, only: [:index]
    resources :user_features, only: [:update]
    resources :sales_networks, only: [:index]
    resources :sales_intros
    resource :admin_signup_links, only: [:show]
    resources :sales_network_invites
    resources :request_templates, only: [:index, :create, :destroy]
    
    #Cypress testing hooks
    get "cypress/first_five_contacts", :to => "cypress_tests#first_five_contacts"
    get "cypress/first_managed_network", :to => "cypress_tests#first_managed_network"
    get "cypress/received_intro_request", :to => "cypress_tests#received_intro_request"

    #Signup Hooks
    post "network_invite_signup", :to => 'users#network_invite_signup'
    post "admin_signup", :to => 'users#admin_signup'
    post "google_sales_signup", :to => 'users#google_sales_signup'
    post "sales_signup", :to => 'users#sales_signup'
    
    #Webhooks
    get "webhooks/clearbit", :to => 'webhooks#clearbit'
    post "webhooks/full_contact_company", :to => 'webhooks#full_contact_company'
    post "webhooks/full_contact_people", :to => 'webhooks#full_contact_people'

    #Sales Feature
    get "sales_contacts/presigned_url", :to => 'sales_contacts#presigned_url'
    post "sales_contacts/connect_social", :to => 'sales_contacts#connect_social'
    get "get_network_invite_code", :to => 'sales_network_invites#show_by_referral_code'
    get "search_sales_networks", :to => 'sales_networks#search_networks'
    patch "respond_intro_request", :to => 'sales_intros#respond_intro_request'
    post "sales_contacts/search", :to => 'sales_contacts#search'
    post "charge", :to => "stripe#charge"

    #Util
    get "public_env_variables", :to => 'utils#public_env_variables'
    post 'validate_unique', :to => "utils#validate_unique"
    post 'notify_request_demo', :to => "utils#request_demo"

    #Other
    post 'add_external_user', :to => 'users#add_external_user'
    get 'third_parties/google_contacts', :to => 'third_parties#google_contacts'
    delete 'destroy_user_by_email', :to => 'users#destroy_by_email'
    patch 'read_all', :to => 'notifications#read_all'
    post 'waitlist_user/create_with_referral', :to => 'waitlist_users#create_with_referral'
    get 'site_templates/:network_id', :to => 'site_templates#show'
    get 'authorization', :to => 'users/sessions#authorize'
    get 'show', :to => 'users/sessions#show'

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

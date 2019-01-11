Rails.application.routes.draw do

  root to: 'static_pages#root'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, default: {format: :json} do
    resources :opportunities
    resources :networks
    resources :connected_opportunities
    resources :finalized_opportunities
    resources :saved_opportunities
    resource :waitlist_user, only: [:create]
    resources :referral_links, only: [:create]
    resources :email_notifications, only: [:index, :create, :show, :destroy, :update]
    # resource :users, only: [] do
    #   resource :user, only: [:update, :destroy]
    # end
    resource :user, only: [:update, :destroy]
    # resource :session, only: [:create, :destroy]

    get 'userOpportunities', :to => 'opportunities#userIndex'
    get 'authorization', :to => 'users/sessions#authorize'
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
  end
end

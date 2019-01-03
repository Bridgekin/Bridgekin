Rails.application.routes.draw do

  root to: 'static_pages#root'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, default: {format: :json} do
    resources :opportunities, only: [:create, :update, :destroy, :show]
    resources :connected_opportunities, only: [:create, :update, :destroy, :show]
    resources :finalized_opportunities, only: [:create, :update, :destroy, :show]
    resources :saved_opportunities, only: [:create, :update, :destroy, :show]
    resource :waitlist_user, only: [:create]
    resources :referral_links, only: [:create]
    # resource :session, only: [:create, :destroy]

    get 'authorization', :to => 'users/sessions#authorize'
    get 'referral_links/:referral_code', :to => 'referral_links#reveal'

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

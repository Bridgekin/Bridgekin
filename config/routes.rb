Rails.application.routes.draw do

  root to: 'static_pages#root'

  resources :opportunities
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, default: {format: :json} do
    # devise_for :users
    # devise_for :users,
    #   path: '',
    #   path_names: {
    #     sign_in: 'login',
    #     sign_out: 'logout',
    #     registration: 'signup'
    #   },
    #   controllers: {
    #     sessions: 'api/sessions',
    #     registrations: 'api/registrations'
    #   }
    # resource :user, only: [:show, :update]
    resources :users, only: [:create, :update]
    resource :session, only: [:create, :destroy]
    resources :opportunities
    resource :waitlist_user, only: [:create]
  end
end

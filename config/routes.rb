Rails.application.routes.draw do
  get 'artist', to: 'artist#index'

  resources :users, only: [:new, :create, :update, :destroy]

  root to: 'artist#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

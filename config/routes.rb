Rails.application.routes.draw do
  get     '/login',   to: 'sessions#new'
  post    '/login',   to: 'sessions#create'
  delete  '/logout',  to: 'sessions#destroy'
  get     '/artist',  to: 'artist#index'

  resources :users, only: [:new, :create, :update, :destroy]

  root to: 'artist#index'
end

Rails.application.routes.draw do
  get     '/login',   to: 'sessions#new'
  post    '/login',   to: 'sessions#create'
  delete  '/logout',  to: 'sessions#destroy'

  resources :artists, only: [:index, :create, :update, :destroy]
  resources :albums, only: [:index, :create, :update, :destroy]
  resources :favorites, only: [:index, :create, :destroy]
  resources :users, only: [:new, :create]

  root to: 'favorites#index'
end

Rails.application.routes.draw do
  get     '/login',   to: 'sessions#new'
  post    '/login',   to: 'sessions#create'
  delete  '/logout',  to: 'sessions#destroy'

  resources :artists, only: [:index, :create, :update, :destroy]
  #resources :albums, :tracks, :favorites
  resources :users, only: [:new, :create, :update, :destroy]

  root to: 'artists#index'
end

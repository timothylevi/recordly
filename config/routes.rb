Rails.application.routes.draw do
  get 'users/new'

  get 'artist', to: 'artist#index'

  root to: 'artist#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

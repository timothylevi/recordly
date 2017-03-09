class FavoritesController < ApplicationController
  def index
    @props = {
      favorites: current_user.favorites
    }
  end

  def create
  end

  def destroy
  end
end

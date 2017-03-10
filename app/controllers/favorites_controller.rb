class FavoritesController < ApplicationController
  extend ApplicationHelper
  include SessionsHelper

  def index
    @props = {
      favorites: current_user.favorites.all.map do |favorite|
        record = favorite.favoriteable
        type = favorite.favoriteable_type
        type_symbol = (type.downcase + "_api").to_sym
        json = FavoritesController.send type_symbol, record, [], current_user
        json["type"] = type

        json
      end
    }
  end

  def create
  end

  def destroy
  end
end

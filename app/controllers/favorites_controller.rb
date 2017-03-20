class FavoritesController < ApplicationController
  before_filter :require_login

  def index
    @props = {
      favorites: current_user.favorites.all.map { |favorite| favorite_api(favorite) }
    }
  end

  def create
    favorite = current_user.favorites.build(favorite_params)

    respond_to do |format|
      format.json do
        favorite.save
        render json: favorite.attributes
      end
    end
  end

  def destroy
    favorite = current_user.favorites.find(params[:id]).destroy
    respond_to do |format|
      format.json do
        render json: favorite.attributes
      end
    end
  end

  private

    def favorite_params
      params.require(:favorite).permit(:id, :favoriteable_type, :favoriteable_id)
    end
end

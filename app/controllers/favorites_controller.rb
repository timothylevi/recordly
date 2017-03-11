class FavoritesController < ApplicationController
  def index
    @props = {
      favorites: current_user.favorites.includes([[:favoriteable]]).all.map { |favorite| favorite_api(favorite) }#:artist, :album, :track
    }
  end

  def create
    favorite = current_user.favorites.new(favorite_params)

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

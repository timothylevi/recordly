class ArtistsController < ApplicationController
  before_filter :require_login

  def index
    @props = {
      artists: current_user.collection.artists.map { |artist| artist_api(artist) },
    }
  end

  def create
    artist = current_user.collection.artists.build(artist_params)

    respond_to do |format|
      format.json do
        artist.save
        render json: artist_api(artist)
      end
    end
  end

  def update
    artist = current_user.collection.artists.find(params[:id])

    respond_to do |format|
      format.json do
        artist.update_attributes(artist_params)
        render json: artist_api(artist)
      end
    end
  end

  def destroy
    artist = current_user.collection.artists.find(params[:id]).destroy
    respond_to do |format|
      format.json do
        render json: artist_api(artist).except(:avatar)
      end
    end
  end

  private

    def artist_params
      params.require(:artist).permit(:avatar, :name, :id)
    end
end

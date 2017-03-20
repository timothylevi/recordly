class AlbumsController < ApplicationController
  before_filter :require_login

  def index
    # byebug
    @props = {
      artists: current_user.collection.artists.map { |artist| artist_api(artist, ["albums"]) },
      albums: current_user.collection.albums.map { |album| album_api(album) }
    }
  end

  def create
    album = current_user.collection.albums.build(album_params)

    respond_to do |format|
      format.json do
        album.save
        render status: 201, json: album_api(album)
      end
    end
  end

  def update
    album = current_user.collection.albums.find(params[:id])

    respond_to do |format|
      format.json do
        album.update_attributes(album_params)
        render json: album_api(album)
      end
    end
  end

  def destroy
    album = current_user.collection.albums.find(params[:id])
    respond_to do |format|
      format.json do
        album.destroy
        render json: album_api(album).except(:avatar)
      end
    end
  end

  private

    def album_params
      params.require(:album).permit(:avatar, :name, :id, artist_ids: [], tracks_attributes: [:id, :name, :track_num])
    end
end

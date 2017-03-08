class AlbumsController < ApplicationController
  include ApplicationHelper

  def index
    @props = {
      artists: Artist.all.map { |artist| artist_api(artist, ["albums"]) },
      albums: Album.includes(:artists, :tracks).all.map { |album| album_api(album) },
      album: Album.new
    }
  end

  def create
    album = Album.new(album_params)

    respond_to do |format|
      format.json do
        album.save
        render json: album_api(album)
      end
    end
  end

  def update
    album = Album.find(params[:id])

    respond_to do |format|
      format.json do
        album.update_attributes(album_params)
        render json: album_api(album)
      end
    end
  end

  def destroy
    album = Album.find(params[:id]).destroy
    respond_to do |format|
      format.json do
        render json: album_api(album).except(:avatar)
      end
    end
  end

  private

    def album_params
      params.require(:album).permit(:avatar, :name, :id, artist_ids: [], tracks_attributes: [:album_id, :name, :track_num])
    end
end

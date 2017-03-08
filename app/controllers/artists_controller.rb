class ArtistsController < ApplicationController
  include ApplicationHelper

  def index
    @props = {
      artists: Artist.includes(:albums).all.map { |artist| artist_api(artist) },
      albums: Album.includes(:tracks, :artists).all.map { |album| album_api(album, ["artists"])},
      artist: Artist.new,
    }
  end

  def create
    artist = Artist.new(artist_params)

    respond_to do |format|
      format.json do
        artist.save
        render json: artist_api(artist)
      end
    end
  end

  def update
    artist = Artist.find(params[:id])

    respond_to do |format|
      format.json do
        artist.update_attributes(artist_params)
        render json: artist_api(artist)
      end
    end
  end

  def destroy
    artist = Artist.find(params[:id]).destroy
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

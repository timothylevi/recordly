class ArtistsController < ApplicationController
  def index
    @props = {
      artists: Artist.includes(albums: :tracks).all.map { |artist| artist_api(artist) },
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

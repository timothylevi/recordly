require 'uri'
require 'base64'

class ArtistsController < ApplicationController
  def index
    @props = {
      artists: Artist.all.map { |artist| artist_api(artist)},
      artist: Artist.new,
      form: true
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

    def artist_api(artist)
      return {
        id: artist.id,
        name: artist.name,
        avatar: artist.avatar.url(:square),
        errors: artist.errors.full_messages
      }
    end
end

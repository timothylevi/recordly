class ArtistController < ApplicationController
  def index
    @artist_props = { name: "Dirty Projectors" }
  end
end

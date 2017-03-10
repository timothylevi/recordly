class ApplicationController < ActionController::Base
  include SessionsHelper

  protect_from_forgery with: :exception

  def artist_api(artist, disabledProps=[])
    return {
      id: artist.id,
      name: artist.name,
      avatar: artist.avatar.url(:square),
      albums: getAlbums(artist, disabledProps),
      favorite: isFavorited(artist, "Artist", current_user),
      errors: artist.errors.full_messages,
      created_at: artist.created_at,
      updated_at: artist.updated_at
    }
  end

  def album_api(album, disabledProps=[])
    return {
      id: album.id,
      name: album.name,
      avatar: album.avatar.url(:square),
      artists: getArtists(album, disabledProps),
      tracks: getTracks(album, disabledProps),
      favorite: isFavorited(album, "Album", current_user),
      errors: album.errors.full_messages,
      created_at: album.created_at,
      updated_at: album.updated_at
    }
  end

  def track_api(track)
    return {
      id: track.id,
      name: track.name,
      track_num: track.track_num,
      favorite: isFavorited(track, "Track", current_user),
      errors: track.errors.full_messages
    }
  end

  def favorite_api(favorite)
    record = favorite.favoriteable
    type = favorite.favoriteable_type
    type_symbol = (type.downcase + "_api").to_sym
    json = self.send type_symbol, record, []
    json["type"] = type

    json
  end

  private

    def getArtists(resource, disabledProps)
      return nil if disabledProps.include?("artists")

      return resource.artists.map { |artist| artist_api(artist, ["albums"]) }
    end

    def getAlbums(resource, disabledProps)
      return nil if disabledProps.include?("albums")

      return resource.albums.map { |album| album_api(album, ["artists"]) }
    end

    def getTracks(resource, disabledProps)
      return nil if disabledProps.include?("tracks")

      return resource.tracks.map { |track| track_api(track) }
    end

    def isFavorited(resource, type, current_user)
      return nil if (!current_user);

      favorite = current_user.favorites.find_by(favoriteable_type: type, favoriteable_id: resource.id)
      return favorite ? favorite.id : favorite
    end
end

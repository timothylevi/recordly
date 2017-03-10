module ApplicationHelper
  extend SessionsHelper

  def artist_api(artist, disabledProps=[])
    def getAlbums(resource, disabledProps)
      return nil if disabledProps.include?("albums")

      return resource.albums.map { |album| album_api(album, ["artists"]) }
    end

    return {
      id: artist.id,
      name: artist.name,
      avatar: artist.avatar.url(:square),
      albums: getAlbums(artist, disabledProps),
      favorite: isFavorited(artist, current_user),
      errors: artist.errors.full_messages,
      created_at: artist.created_at,
      updated_at: artist.updated_at
    }
  end

  def album_api(album, disabledProps=[])
    def getArtists(resource, disabledProps)
      return nil if disabledProps.include?("artists")

      return resource.artists.map { |artist| artist_api(artist, ["albums"]) }
    end

    def getTracks(resource, disabledProps)
      return nil if disabledProps.include?("tracks")

      return resource.tracks.map { |track| track_api(track) }
    end

    return {
      id: album.id,
      name: album.name,
      avatar: album.avatar.url(:square),
      artists: getArtists(album, disabledProps),
      tracks: getTracks(album, disabledProps),
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
      errors: track.errors.full_messages
    }
  end

  def isFavorited(artist, current_user)
    return nil if (!current_user);
    favorite = current_user.favorites.find_by(favoriteable_type: "Artist", favoriteable_id: artist.id)
    return favorite ? favorite.id : favorite
  end
end

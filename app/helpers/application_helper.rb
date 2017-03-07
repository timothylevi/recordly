module ApplicationHelper
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
      errors: artist.errors.full_messages
    }
  end

  def album_api(album, disabledProps=[])
    def getArtists(resource, disabledProps)
      return nil if disabledProps.include?("artists")

      return resource.artists.map { |artist| artist_api(artist, ["albums"]) }
    end

    return {
      id: album.id,
      name: album.name,
      avatar: album.avatar.url(:square),
      artists: getArtists(album, disabledProps),
      errors: album.errors.full_messages
    }
  end
end

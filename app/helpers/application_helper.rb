module ApplicationHelper
  def artist_api(artist)
    return {
      id: artist.id,
      name: artist.name,
      avatar: artist.avatar.url(:square),
      errors: artist.errors.full_messages
    }
  end

  def album_api(album)
    return {
      id: album.id,
      name: album.name,
      avatar: album.avatar.url(:square),
      errors: album.errors.full_messages,
      artists: album.artists.map { |artist| artist_api(artist) }
    }
  end
end

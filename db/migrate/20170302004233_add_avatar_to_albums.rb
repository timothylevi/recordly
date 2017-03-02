class AddAvatarToAlbums < ActiveRecord::Migration[5.0]
  def self.up
    add_attachment :albums, :avatar
  end

  def self.down
    remove_attachment :albums, :avatar
  end

end

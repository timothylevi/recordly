class AddAvatarToArtists < ActiveRecord::Migration[5.0]
  def self.up
    add_attachment :artists, :avatar
  end

  def self.down
    remove_attachment :artists, :avatar
  end
end

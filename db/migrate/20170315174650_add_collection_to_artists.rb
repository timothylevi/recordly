class AddCollectionToArtists < ActiveRecord::Migration[5.0]
  def change
    add_reference :artists, :collection, foreign_key: true, index: true
  end
end

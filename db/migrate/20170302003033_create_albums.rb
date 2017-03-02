class CreateAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.string :name

      t.timestamps
    end

    create_table :artists_albums, id: false do |t|
      t.belongs_to :artist, index: true
      t.belongs_to :album, index: true
    end
  end
end

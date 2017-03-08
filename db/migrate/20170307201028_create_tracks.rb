class CreateTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks do |t|
      t.string :name
      t.integer :track_num

      t.belongs_to :album, index: true

      t.timestamps
    end
  end
end

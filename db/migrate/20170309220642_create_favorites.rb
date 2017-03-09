class CreateFavorites < ActiveRecord::Migration[5.0]
  def change
    create_table :favorites do |t|
      t.belongs_to :user, foreign_key: true
      t.references :favoriteable, polymorphic: true, index: true

      t.timestamps
    end
  end
end

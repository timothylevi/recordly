class CreateCollections < ActiveRecord::Migration[5.0]
  def change
    create_table :collections do |t|
      t.references :user, foreign_key: true, index: true

      t.timestamps
    end
  end
end

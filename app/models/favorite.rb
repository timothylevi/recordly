class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :favoriteable, polymorphic: true
end

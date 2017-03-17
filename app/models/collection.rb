class Collection < ApplicationRecord
  validates :user, presence: true

  belongs_to :user
  has_many :artists
  has_many :albums
end

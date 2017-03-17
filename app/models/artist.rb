class Artist < ApplicationRecord
  has_attached_file :avatar, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  },
  path: "avatar/:id/:style/:basename.:extension",
  default_url: "/images/missing_artist.png"

  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  validates :name, presence: true, uniqueness: { scope: :collection, case_sensitive: false }, length: { maximum: 255 }
  validates :collection, presence: true

  belongs_to :collection
  has_and_belongs_to_many :albums, join_table: :artists_albums
  has_many :favorites, as: :favoriteable
end

class Artist < ApplicationRecord
  has_attached_file :avatar, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  },
  path: "avatar/:id/:style/:basename.:extension"

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 255 }
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
end

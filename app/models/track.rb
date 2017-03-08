class Track < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :album, case_sensitive: false }, length: { maximum: 255 }
  validates :track_num, presence: true
  validates_presence_of :album

  belongs_to :album, inverse_of: :tracks
end

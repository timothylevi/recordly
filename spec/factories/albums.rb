require 'faker'

FactoryGirl.define do
  factory :album, class: Album do
    name { Faker::Name.title }
    collection

    after :build do |album|
      album.tracks << create(:track, album: album)
    end
  end
end

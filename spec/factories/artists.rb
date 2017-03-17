require 'faker'

FactoryGirl.define do
  factory :artist, class: Artist do
    name { Faker::Name.name }
    collection
  end
end

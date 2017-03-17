require 'faker'

FactoryGirl.define do
  factory :user do
    transient do
      artists []
      albums []
    end

    password = Faker::Internet.password

    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { password }
    password_confirmation { password }

    after :create do |user, evaluator|
      user.collection.artists = evaluator.artists
      user.collection.albums = evaluator.albums
    end
  end
end

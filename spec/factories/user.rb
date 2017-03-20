require 'faker'

FactoryGirl.define do
  factory :new_user, class: User do
    name nil
    email nil
    password nil
    password_confirmation nil
  end

  factory :user, class: User do
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

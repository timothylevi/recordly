require 'faker'

FactoryGirl.define do
  factory :collection, class: Collection do
    artists []
    albums []
    user
  end
end

require 'faker'

FactoryGirl.define do
  factory :track, class: Track do
    track_num do
      num = Faker::Number.number(3).to_i
      if num <= 0
        num *= -1
        num += 1
      end

      num
    end
    name { Faker::Name.title }
  end
end

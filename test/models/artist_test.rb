require 'test_helper'

class ArtistTest < ActiveSupport::TestCase
  def setup
    @test_artist = Artist.new(
      name: "Test Artist",
      avatar: File.new("#{Rails.root}/test/assets/artist.jpg")
    )
  end

  test "should be valid" do
    valid = @test_artist.valid?

    assert @test_artist.valid?
  end

  test "name should be present" do
    @test_artist.name = nil
    assert_not @test_artist.valid?
  end

  test "avatar may be absent" do
    @test_artist.avatar = nil
    assert @test_artist.valid?
  end

  test "name should not be too long" do
    max_length = 255
    @test_artist.name = "n" * (max_length + 1)
  end

  test "name should be unique and case insensitive" do
    dup_artist = @test_artist.dup
    dup_artist.name = @test_artist.name.upcase

    @test_artist.save

    assert_not dup_artist.valid?
  end
end

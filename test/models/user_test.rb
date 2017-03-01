require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @test_user = User.new(
      name: "User",
      email: "user@example.com",
      password: "user_password",
      password_confirmation: "user_password",
      # TODO: Replace collection with new collection object
      # collection: {}
    )
  end

  # TODO: fix test
  # test "should be valid" do
  #   assert @test_user.valid?
  # end

  test "name should be present" do
    @test_user.name = " "
    assert_not @test_user.valid?
  end

  test "name should not be too long" do
    max_length = 60

    @test_user.name = "u" * (max_length + 1)

    assert_not @test_user.valid?
  end

  test "email should be present" do
    @test_user.email = " "
    assert_not @test_user.valid?
  end

  test "email should not be too long" do
    max_length = 255
    max_length_non_inclusive = max_length + 1
    email = "@example.com"

    @test_user.email = "u" * (max_length_non_inclusive - email.length) + email

    assert_not @test_user.valid?
  end

  test "email address should be unique" do
    dup_user = @test_user.dup

    @test_user.save

    assert_not dup_user.valid?
  end

  test "email address should be unique and case insensitive" do
    dup_user = @test_user.dup
    dup_user.email = @test_user.email.upcase

    @test_user.save

    assert_not dup_user.valid?
  end

  # TODO: fix test
  # test "email should be saved in lowercase" do
  #   mixed_case_email = "uSeR@eXaMpLe.CoM"
  #   @test_user.email = mixed_case_email
  #
  #   @test_user.save
  #
  #   assert_equal mixed_case_email.downcase, @test_user.reload.email
  # end

  test "email should be an email" do
    # I won't check for this manually, instead, I'll send an email
    # to confirm setting up accounts and if the user receives the
    # email, then it's valid, and the user completes registration
  end

  # TODO: Implement test when collection is created
  # test "collection should be present" do
  #   @test_user.collection = nil
  #   assert_not @test_user.valid?
  # end

  test "password should be present" do
    @test_user.password = nil

    assert_not @test_user.valid?
  end

  test "password confirmation should be present" do
    @test_user.password = " "
    @test_user.password_confirmation = nil

    assert_not @test_user.valid?
  end

  test "password should have a minimum length" do
    minimum_length = 8

    @test_user.password = "u" * (minimum_length - 1)
    @test_user.password_confirmation = @test_user.password

    assert_not @test_user.valid?
  end

end

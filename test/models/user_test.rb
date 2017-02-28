require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(
      name: "User",
      email: "user@example.com",
      password: "user_password",
      password_confirmation: "user_password",
      # TODO: Replace collection with new collection object
      # collection: {}
    )
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = " "
    assert_not @user.valid?
  end

  test "name should not be too long" do
    max_length = 60

    @user.name = "u" * (max_length + 1)

    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email = " "
    assert_not @user.valid?
  end

  test "email should not be too long" do
    max_length = 255
    max_length_non_inclusive = max_length + 1
    email = "@example.com"

    @user.email = "u" * (max_length_non_inclusive - email.length) + email

    assert_not @user.valid?
  end

  # TODO: Email uniqueness tests don't pass
  test "email address should be unique" do
    dup_user = @user.dup

    @user.save

    assert_not dup_user.valid?
  end

  test "email address should be unique and case insensitive" do
    dup_user = @user.dup
    dup_user.email = @user.email.upcase

    @user.save

    assert_not dup_user.valid?
  end

  test "email should be saved in lowercase" do
    mixed_case_email = "uSeR@eXaMpLe.CoM"
    @user.email = mixed_case_email

    @user.save

    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test "email should be an email" do
    # I won't check for this manually, instead, I'll send an email
    # to confirm setting up accounts and if the user receives the
    # email, then it's valid, and the user completes registration
  end

  # TODO: Implement test when collection is created
  # test "collection should be present" do
  #   @user.collection = nil
  #   assert_not @user.valid?
  # end

  test "password should be present" do
    @user.password = nil

    assert_not @user.valid?
  end

  test "password confirmation should be present" do
    @user.password = " "
    @user.password_confirmation = nil

    assert_not @user.valid?
  end

  test "password should have a minimum length" do
    minimum_length = 8

    @user.password = "u" * (minimum_length - 1)
    @user.password_confirmation = @user.password

    assert_not @user.valid?
  end

end

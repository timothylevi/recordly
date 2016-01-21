require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: "Timothy", email: "timothy@gmail.com", password: "timothy", password_confirmation: "timothy")
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = "      "
    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email = "     "
    assert_not @user.valid?
  end

  test "name should not be too long" do
    @user.name = "a" * 51
    assert_not @user.valid?
  end

  test "email should not be too long" do
    @user.email = "a" * 256
    assert_not @user.valid?
  end

  test "email address should be unique" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

  test "email address should be saved lowercase" do
    @user.email = "TIMOTHY@GMAIL.COM"
    @user.save
    assert @user.email == 'timothy@gmail.com'
  end

  test "password should be present (nonblank)" do
    @user.password = @user.password_confirmation = "     "
    assert_not @user.valid?
  end

  test "password should have a minimum length" do
    @user.password = @user.password_confirmation = "     "
    assert_not @user.valid?
  end
end

require 'spec_helper'

class UsersRegisterTest < ActionDispatch::IntegrationTest
  test "valid registration" do
    get new_user_path

    assert_difference 'User.count' do
      post users_path, params: {
        user: {
          name: "User",
          email: "user@example.com",
          password: "password",
          password_confirmation: "password"
        }
      }
    end

    follow_redirect!
    assert_template 'artist/index'
    assert is_logged_in?
  end

  test "invalid registration" do
    get new_user_path

    assert_no_difference 'User.count' do
      post users_path, params: {
        user: {
          name: "",
          email: "user@example.com",
          password: nil,
          password_confirmation: nil
        }
      }
    end

    assert_template 'users/new'
  end
end

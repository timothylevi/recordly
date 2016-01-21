require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
  test "invalid sign up" do
    get root_path
    assert_no_difference 'User.count' do
      post users_path, user: { name: "",
                               email: "",
                               password: "",
                               password_confirmation: "" }
    end
    assert_template 'users/new'
  end
  
  test "valid signup information" do
    get root_path
    assert_difference 'User.count', 1 do
      post_via_redirect users_path, user: { name: "Timothy",
                                            email: "tim@gmail.com",
                                            password: "password",
                                            password_confirmation: "password" }
      end
    assert_template 'users/show'
  end
end

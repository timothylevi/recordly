require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should route root to home page" do
    opts = { :controller => 'static_pages', :action => 'home'}
    assert_recognizes opts, '/'
  end

  test "should get home" do
    get :home
    assert_response :success
    assert_select "title", "Recordly – Home"
  end

  test "should get help" do
    get :help
    assert_response :success
    assert_select "title", "Recordly – Help"
  end

  test "should get about" do
    get :about
    assert_response :success
    assert_select "title", "Recordly – About"
  end

end

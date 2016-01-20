require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  # Testing root info source: http://www.derekhammer.com/2011/02/19/root-route-testing-in-rails.html
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

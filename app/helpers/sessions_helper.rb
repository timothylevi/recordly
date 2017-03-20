module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
  end

  def current_user
    # This is a little ugly
    @current_user ||= User.includes(favorites: :favoriteable, collection: {artists: {albums: [:tracks]}, albums: []}).find_by(id: session[:user_id])
  end

  def logged_in?
    !current_user.nil?
  end

  def log_out
    session.delete(:user_id)
    @current_user = nil
  end
end

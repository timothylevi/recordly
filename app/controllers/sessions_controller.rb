class SessionsController < ApplicationController
  before_filter :require_login, only: :destroy

  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      flash[:success] = "You're logged in!"
      redirect_to root_path
    else
      flash.now[:danger] = "Email address and password combination not found"
      render 'new'
    end
  end

  def destroy
    log_out
    redirect_to root_path
  end
end

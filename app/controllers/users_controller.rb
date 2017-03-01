class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "Welcome to Recordly, #{@user.name}!"
      redirect_to root_path
    else
      byebug
      render 'new'
    end
  end

  def update

  end

  def destroy

  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end

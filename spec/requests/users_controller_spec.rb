describe UsersController, type: :controller do
  describe "GET#new" do
    it "has a 200 status code" do
      get :new
      expect(response.status).to eq(200)
    end

    it "renders the new view" do
      get :new
      expect(response).to render_template(:new)
    end

    it "creates a new user" do
      get :new
      user = build(:new_user)
      expect(assigns(:user).attributes).to eq(user.attributes)
    end
  end

  describe "POST#create" do
    describe "sending a valid user" do
      it "has a 301 status code" do
        user = build(:user).attributes
        user["password_confirmation"] = user["password"] = user.delete("password_digest")
        post :create, params: { user: user }
        expect(response.status).to eq(301)
      end
      it "redirects to the root_path with a valid user"
      it "flashes a welcome message to user"
      it "logs the user in"
    end
    describe "sending an invalid user" do
      it "has a 404 status code"
      it "flashes the user error messages"
      it "renders the :new view with an invalid user"
    end
  end

  describe "user_params"
end

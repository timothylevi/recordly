describe AlbumsController, type: :controller do
  before :each do
    password = Faker::Internet.password(10)
    user = create(:user, password: password, password_confirmation: password)

    session[:user_id] = user.id
  end

  describe "GET#index" do
    it "has a 200 status code" do
      get :index
      expect(response.status).to be(200)
    end
    it "renders the index view"
    it "assigns a list of artists to props"
    it "assigns a list of albums to props"
  end

  describe "POST#create" do
    describe "sending a valid album" do
      it "has a 201 status code" do
        request.accept = "application/json"
        post :create, params: { album: build(:album).attributes }
        expect(response.status).to be(201)
      end
      it "responds with a JSON representation of the album" do
        request.accept = "application/json"

        album = build(:album)
        album_attrs = album.attributes
        album_attrs['artist_ids'] = album.artists.map { |artist| artist.id }

        %w(
          artists
          created_at
          updated_at
          avatar_file_name
          avatar_content_type
          avatar_file_size
          avatar_updated_at
        ).map { |key| album_attrs.delete(key)}

        post :create, params: { album: album_attrs }
        byebug
        expect(JSON.parse response.body).to be(album_attrs)
      end
      it "adds an album to the collection" do

      end
    end

    describe "sending an invalid album" do
      it "has a 500 status code" # TODO: Unprocessable status code
      it "responds with a JSON representation of the album with errors"
      it "doesn't add an album to the collection"
    end
  end

  describe "PATCH#update" do
    describe "sending a valid partial album" do
      it "has a 202 status code" # TODO: Updated status code
      it "responds with a JSON representation of the album"
    end

    describe "sending an invalid partial album" do
      it "has a 500 status code"
      it "responds with a JSON respresentation of the album with errors"
    end
  end

  describe "DELETE#destroy" do
    it "has a 200 status code" # TODO: Successfully deleted
    it "responds with a JSON representation of the album without the avatar"
  end

  describe "album_params"
end

describe Album do
  before(:each) do
    test_user = create(:user, artists: [create(:artist)])
    test_user.collection.albums << build(:album, artists: test_user.collection.artists)
    @test_album = test_user.collection.albums.first
  end

  it "has a valid factory" do
    expect(@test_album).to be_valid
  end

  it "name should be present" do
    @test_album.name = nil
    expect(@test_album).not_to be_valid
  end

  it "name should be unique to the artists within the collection" do
    dup_album = @test_album.dup
    dup_album.artists = @test_album.artists
    dup_album.collection = create(:collection)
    dup_album.artists.first.collection = dup_album.collection
    expect(dup_album).to be_valid
  end

  it "name should be unique and case insensitive" do
    dup_album = @test_album.dup
    dup_album.name = 'example album'
    expect(dup_album).not_to be_valid
  end

  it "name should not be too long" do
    max_length = 255
    @test_album.name = "n" * (max_length + 1)
    expect(@test_album).not_to be_valid
  end

  it "artists should be present" do
    @test_album.artists = []
    expect(@test_album).not_to be_valid
  end

  it "collection should be present" do
    @test_album.collection = nil
    expect(@test_album).not_to be_valid
  end
end

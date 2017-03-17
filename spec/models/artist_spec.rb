describe Artist do
  before(:each) do
    test_user = create(:user, artists: [create(:artist)])
    @test_artist = test_user.collection.artists.first
  end

  it "should be valid" do
    expect(@test_artist).to be_valid
  end

  it "name should be present" do
    @test_artist.name = nil
    expect(@test_artist).not_to be_valid
  end

  it "avatar may be absent" do
    @test_artist.avatar = nil
    expect(@test_artist).to be_valid
  end

  it "name should not be too long" do
    max_length = 255
    @test_artist.name = "n" * (max_length + 1)
    expect(@test_artist).not_to be_valid
  end

  it "name should be unique and case insensitive" do
    dup_artist = @test_artist.dup
    dup_artist.name = @test_artist.name.upcase
    expect(dup_artist).not_to be_valid
  end

  it "artist names can be the same between collections" do
    dup_artist = @test_artist.dup
    dup_artist.collection = create(:collection)
    expect(dup_artist).to be_valid
  end
end

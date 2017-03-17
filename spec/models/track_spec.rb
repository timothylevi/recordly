describe Track do
  before(:each) do
    test_user = create(:user)
    test_user.collection.artists = [create(:artist)]
    test_user.collection.albums = [build(:album, artists: test_user.collection.artists)]

    @track = test_user.collection.albums.first.tracks.first
  end

  it "should be valid" do
    expect(@track).to be_valid
  end

  it "name should be present" do
    @track.name = " "
    expect(@track).not_to be_valid
  end

  it "track number should be present" do
    @track.track_num = nil
    expect(@track).not_to be_valid
  end

  it "track number should be positive non-zero integer" do
    @track.track_num = -1
    expect(@track).not_to be_valid

    @track.track_num = 1.1
    expect(@track).not_to be_valid

    @track.track_num = -1.1
    expect(@track).not_to be_valid
  end

  it "track should belong to an album" do
    @track.album = nil
    expect(@track).not_to be_valid
  end

  it "track names on the same album should be unique" do
    dup_track = @track.dup
    dup_track.track_num = 2

    expect(dup_track).not_to be_valid
  end

  it "track numbers on the same album should be unique" do
    dup_track = @track.dup
    dup_track.name = "Dup Example Track"

    expect(dup_track).not_to be_valid
  end

  it "track names and numbers can be the same between albums" do
    dup_album = @track.album.dup
    dup_album.name = 'Dup Example Album'

    dup_track = @track.dup
    dup_track.album = dup_album

    expect(dup_track).to be_valid
  end
end

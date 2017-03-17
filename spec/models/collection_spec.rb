describe Collection do
  it "should have a valid factory" do
    expect(create(:collection)).to be_valid
  end

  it "should have a user" do
    expect { create(:collection, user: nil) }.to raise_error(ActiveRecord::RecordInvalid)
  end
end

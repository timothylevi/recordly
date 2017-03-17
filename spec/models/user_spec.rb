describe User do
  before(:each) do
    @test_user = create(:user)
  end

  it "should be valid" do
    expect(@test_user).to be_valid
  end

  it "name should be present" do
    @test_user.name = " "
    expect(@test_user).not_to be_valid
  end

  it "name should not be too long" do
    max_length = 60

    @test_user.name = "u" * (max_length + 1)

    expect(@test_user).not_to be_valid
  end

  it "email should be present" do
    @test_user.email = " "
    expect(@test_user).not_to be_valid
  end

  it "email should not be too long" do
    max_length = 255
    max_length_non_inclusive = max_length + 1
    email = "@example.com"

    @test_user.email = "u" * (max_length_non_inclusive - email.length) + email

    expect(@test_user).not_to be_valid
  end

  it "email address should be unique" do
    dup_user = @test_user.dup

    @test_user.save

    expect(dup_user).not_to be_valid
  end

  it "email address should be unique and case insensitive" do
    dup_user = @test_user.dup
    dup_user.email = @test_user.email.upcase

    @test_user.save

    expect(dup_user).not_to be_valid
  end

  it "email should be saved in lowercase" do
    mixed_case_email = "cAsEuSeR@eXaMpLe.CoM"
    @test_user.email = mixed_case_email

    @test_user.save

    expect(@test_user.email).to eq(mixed_case_email.downcase)
  end

  it "password should be present" do
    @test_user.password = nil

    expect(@test_user).not_to be_valid
  end

  it "password confirmation should be present" do
    @test_user.password = " "
    @test_user.password_confirmation = nil

    expect(@test_user).not_to be_valid
  end

  it "password should have a minimum length" do
    minimum_length = 8

    @test_user.password = "u" * (minimum_length - 1)
    @test_user.password_confirmation = @test_user.password

    expect(@test_user).not_to be_valid
  end

  it "collection should be created for new user" do
    expect(@test_user).to be_valid
    expect(@test_user.collection).to be_valid
  end
end

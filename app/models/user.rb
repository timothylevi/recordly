class User < ApplicationRecord
  validates :name, presence: true, length: { maximum: 60 }
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 8 }
  validates :password_confirmation, presence: true
  validates :collection, presence: true

  has_many :favorites
  has_one :collection

  has_secure_password

  before_validation :format_email_and_create_collection

  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def format_email_and_create_collection
    self.email = self.email.downcase
    self.collection = Collection.new()
  end
end

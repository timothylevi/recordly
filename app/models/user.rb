class User < ApplicationRecord
  before_save { self.email = self.email.downcase }

  validates :name, presence: true, length: { maximum: 60 }
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 8 }
  validates :password_confirmation, presence: true
  # validates :collection, presence: true

  has_secure_password

  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
end

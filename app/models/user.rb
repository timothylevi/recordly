class User < ApplicationRecord
  attr_accessor :name, :email, :password_digest

  before_save { self.email = self.email.downcase }

  validates :name, presence: true, length: { maximum: 60 }
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: true
  validates :password, presence: true, length: { minimum: 8 }
  validates :password_confirmation, presence: true
  # validates :collection, presence: true

  has_secure_password
end

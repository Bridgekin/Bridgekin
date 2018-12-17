class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :trackable, :validatable,
  #        :jwt_authenticatable,jwt_revocation_strategy: JWTBlacklist

  # validates :email, uniqueness: { case_sensitive: false }, presence: true
  validates :email, :name, :password_digest, :session_token, presence: true
  validates :session_token, uniqueness: true

  after_initialize :ensure_session_token

  attr_reader :password

  # def generate_jwt
  #   JWT.encode({ id: id,
  #     exp: 3.days.from_now.to_i },
  #     Rails.application.secret_key_base)
  # end
  def self.find_by_credentials(email,password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    nil
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

end

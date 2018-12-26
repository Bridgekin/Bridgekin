class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable
         # :jwt_authenticatable,jwt_revocation_strategy: JWTBlacklist

  # validates :email, uniqueness: { case_sensitive: false }, presence: true
  validates :email, :fname, :lname,  presence: true
  # validates :password_digest, presence: true
  # validates :session_token, :email, uniqueness: true

  # after_initialize :ensure_session_token

  # attr_reader :password

  def confirmed?
    self.confirmed_at.present?
  end

  def generate_jwt
    JWT.encode({ id: id,
      exp: 3.days.from_now.to_i },
      Rails.application.secret_key_base)
  end

  def self.find_by_credentials(email,password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    nil
  end

  # def password=(pw)
  #   @password = pw
  #   self.password_digest = BCrypt::Password.create(pw)
  # end
  #
  # def is_password?(pw)
  #   BCrypt::Password.new(self.password_digest).is_password?(pw)
  # end

  # def generate_session_token
  #   SecureRandom.urlsafe_base64
  # end
  #
  # def ensure_session_token
  #   self.session_token ||= generate_session_token
  # end
  #
  # def reset_session_token!
  #   self.session_token = generate_session_token
  #   self.save!
  #   self.session_token
  # end

end

class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable
         # :jwt_authenticatable,jwt_revocation_strategy: JWTBlacklist

  validates :email, uniqueness: { case_sensitive: false }, presence: true
  validates :email, :fname, :lname,  presence: true

  has_many :opportunities,
    foreign_key: :owner_id,
    class_name: :Opportunity

  has_many :connected_opportunities,
    foreign_key: :user_id,
    class_name: :ConnectedOpportunity

  has_many :finalized_opportunities,
    foreign_key: :user_id,
    class_name: :FinalizedOpportunity

  has_many :saved_opportunities,
    foreign_key: :user_id,
    class_name: :SavedOpportunity

  has_many :facilitated_opportunities,
    foreign_key: :facilitator_id,
    class_name: :ConnectedOpportunity

  has_many :facilitated_deals,
    foreign_key: :facilitator_id,
    class_name: :FinalizedOpportunity

  def confirmed?
    self.confirmed_at.present?
  end

  def self.find_by_credentials(email,password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    nil
  end

  # validates :password_digest, presence: true
  # validates :session_token, :email, uniqueness: true
  # after_initialize :ensure_session_token
  # attr_reader :password

  # def generate_jwt
  #   JWT.encode({ id: id,
  #     exp: 3.days.from_now.to_i },
  #     Rails.application.secret_key_base)
  # end

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

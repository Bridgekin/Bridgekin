require 'jwt'

ALGORITHM = 'HS256'

class JwtService
  def self.encode(payload)
    JWT.encode(payload, self.secret, ALGORITHM)
  end

  def self.decode(token)
    JWT.decode(token,
      self.secret,
      true,
      { algorithm: ALGORITHM }).first
  end

  def self.secret
    Rails.application.credentials.DEVISE_JWT_SECRET_KEY
    # Rails.application.secret_key_base
    # Rails.application.credentials[Rails.env.to_sym][:DEVISE_JWT_SECRET_KEY]
  end
end

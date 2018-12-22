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
    Rails.application.secrets.secret_key_base
  end
end

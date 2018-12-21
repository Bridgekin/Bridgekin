json.extract! user, :id, :name, :authentication_token, :confirmed_at
json.token user.generate_jwt

require "jwt_service"
module DeviseControllerPatch
  def get_login_token!(user)
    payload = {
      "sub": user.id,
      "exp": 14.days.from_now.to_i
    }
    JwtService.encode(payload)
  end

  def authenticate_user
    if request.headers['Authorization']
      begin
        token = request.headers['Authorization'].split('"').last
        jwt_decoded = JwtService.decode(token)
        user_id = jwt_decoded['sub']
        @user = User.find(user_id)

        #set current_user
        # @current_user = @user
        #create new token
        # @token = get_login_token!(@user)

      rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
        redirect_to "#{root_url}"
        head :unauthorized
      end

    else
      head :unauthorized
    end
  end

  def pundit_user
    @user
  end

  def createShareOptions(resources, name)
    resources.reduce([]) do |arr, resource|
      arr << "#{resource.id}-#{name}"
    end
  end

  def createOppPermissions(oppPermissions)
    oppPermissions.reduce([]) do |arr, perm|
      arr << "#{perm.shareable_id}-#{perm.shareable_type}"
    end
  end

end

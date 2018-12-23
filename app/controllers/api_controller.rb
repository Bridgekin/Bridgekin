require "jwt_service"

class ApiController < ActionController::API
  # include ActionController::HttpAuthentication::Token::ControllerMethods
  # acts_as_token_authentication_handler_for User, fallback: :none

  # protect_from_forgery prepend: true, with: :exception
  helper_method :logged_in?, :current_user


  respond_to :json

  def logged_in?
    !!@current_user
  end

  def login!(user)
    @current_user = user
  end

  def logout!
    @current_user = nil
  end

  def require_signed_in!
    redirect_to new_session_url unless logged_in?
  end

  def require_signed_out!
    redirect_to user_url(current_user) if logged_in?
  end

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
        @current_user = @user

        #create new token
        @token = get_login_token!(@user)

      rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
        logout!
        head :unauthorized
      end

    else
      logout
      head :unauthorized
    end
  end

end

# def current_user
#   @current_user ||= User.find_by(session_token: session[:session_token])
# end

# def login!(user)
#   session[:session_token] = user.reset_session_token!
#   @current_user = user
# end
#
# def logout!
#   current_user.reset_session_token!
#   session[:session_token] = nil
#   @current_user = nil
# end

require "jwt_service"

class ApiController < ActionController::API
  # include ActionController::HttpAuthentication::Token::ControllerMethods
  # acts_as_token_authentication_handler_for User, fallback: :none
  # before_bugsnag_notify :add_diagnostics_to_bugsnag
  # before_bugsnag_notify :add_user_info_to_bugsnag
  before_action :set_raven_context

  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # protect_from_forgery prepend: true, with: :exception
  helper_method :logged_in?, :current_user

  respond_to :json

  def get_login_token!(user)
    payload = {
      "sub": user.id,
      "exp": 7.days.from_now.to_i
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
        # @token = get_login_token!(@user)

      rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
        head :unauthorized
      end

    else
      head :unauthorized
    end
  end

  private

  def user_not_authorized
    render json: ["You are not authorized to perform this action."], status: 401
  end

  def set_raven_context
    Raven.user_context(id: 'test') # session[:current_user_id]) # or anything else in session
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

  def add_diagnostics_to_bugsnag(report)
    report.add_tab(:diagnostics, {
      product: current_product.name
    })
  end

  def add_user_info_to_bugsnag(report)
    report.user = {
      email: @user.email,
      name: @user.name,
      id: @user.id
    }
  end

end

# def logged_in?
#   !!@current_user
# end

# def login!(user)
#   @current_user = user
# end
#
# def logout!
#   @current_user = nil
# end

# def require_signed_in!
#   redirect_to new_session_url unless logged_in?
# end
#
# def require_signed_out!
#   redirect_to user_url(current_user) if logged_in?
# end

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

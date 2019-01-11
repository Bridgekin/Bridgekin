class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # # Overrides Devise
  # def after_sign_in_path_for(resource)
  #   return params[:redirect_to] unless params[:redirect_to].blank?
  #
  #   if email_confirmation_required?(resource)
  #     new_user_confirmation_path
  #   else
  #     stored_location_for(resource) || signed_in_root_path(resource)
  #   end
  # end
  # 
  # # Overrides Devise
  # def signed_in_root_path(resource)
  #   return params[:redirect_to] unless params[:redirect_to].blank?
  #
  #   if email_confirmation_required?(resource)
  #     new_user_confirmation_url
  #   else
  #     stories_url subdomain: false
  #   end
  # end
  #
  # # Overrides Devise
  # def after_sign_out_path_for(resource_or_scope)
  #   if params[:redirect_to].present?
  #     params[:redirect_to]
  #   else
  #     new_user_session_path(subdomain: false)
  #   end
  # end

  private

  # def underscore_params!
  #   params.deep_transform_keys!(&:underscore)
  # end
  #
  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  # end
  #
  # def authenticate_user
  #   if request.headers['Authorization'].present?
  #     authenticate_or_request_with_http_token do |token|
  #       begin
  #         jwt_payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
  #
  #         @current_user_id = jwt_payload['id']
  #       rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
  #         head :unauthorized
  #       end
  #     end
  #   end
  # end

  # def current_user
  #   @current_user ||= super || User.find(@current_user_id)
  # end
  #
  # def signed_in?
  #   @current_user_id.present?
  # end

end

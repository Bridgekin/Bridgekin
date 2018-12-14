# frozen_string_literal: true

class Api::Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  # protect_from_forgery prepend: true, with: :exception
  protect_from_forgery with: :null_session

  before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    super
    render json: ["logged in successsfully"], status: 200
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
end

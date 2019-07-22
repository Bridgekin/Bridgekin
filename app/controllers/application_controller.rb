class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  protect_from_forgery with: :exception

  def fallback_index_html
    render :file => 'public/index.html'
  end

  private

  def user_not_authorized
    render json: ["You are not authorized to perform this action."], status: 401
  end
end

class Api::UtilsController < ApiController
  def show
    @public_env = {
      rails_env: ENV.fetch("RAILS_ENV")
    }
    render :show
  end
end

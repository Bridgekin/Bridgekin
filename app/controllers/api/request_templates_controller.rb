class Api::RequestTemplatesController < ApiController
  before_action :authenticate_user

  def index
    @request_templates = @current_user.request_templates
    render :index
  end

  def create
    @request_template = @current_user.request_templates.new(request_template_params)
    if @request_template.save
      render :show
    else
      render json: @request_template.errors.full_messages, status: 422
    end
  end

  def destroy
    @request_template = @current_user.request_templates
      .where(id: params[:id]).first
    if @request_template && @request_template.destroy
      render json: ['Success'], status: 200
    else
      render json: @request_template.errors.full_messages, status: 422
    end
  end

  private

  def request_template_params
    params.permit(:subject, :name, :body)
  end
  
end

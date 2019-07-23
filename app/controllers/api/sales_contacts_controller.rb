class Api::SalesContactsController < ApiController
  before_action :authenticate_user
  # before_action :set_ref_opp, only: [:show]

  def search
    filter = social_params[:filter]
    network = SalesNetwork.find(params[:current_sales_network_id])
    @sales_contacts = SalesContact.search_contacts(@current_user, network, filter, social_params)
    #Prep Search Data
    offset, limit = social_params[:offset], social_params[:limit]
    @sales_contacts, @total, @friend_map, @friend_users = SalesContact.prep_search_data(@sales_contacts, offset, limit, @current_user)
    render :index
  end

  def connect_social
    inputs = params[:connect_social] 
    import_hash = {}
    unless inputs.nil?
      inputs.each do |key, upload|
        case key
        when "linked_in_key"
          import_hash[key] = upload
        when "google_key"
          import_hash[key] = upload
        else
        end
      end
      ConnectSocialJob.perform_later(import_hash, @current_user)
    end
    render json: ["Parsing Results"], status: 201
  end

  def presigned_url
    aws_env = case Rails.env
    when "production"
      :aws_prod
    when "staging"
      :aws_staging
    else
      :aws_dev
    end

    filename = params[:filename]
    key = "#{SecureRandom.uuid}-#{filename}"
    s3 = Aws::S3::Client.new(
      region: Rails.application.credentials[aws_env][:region], #or any other region
      access_key_id: Rails.application.credentials[aws_env][:access_key_id],
      secret_access_key: Rails.application.credentials[aws_env][:secret_access_key]
    )
    signer = Aws::S3::Presigner.new(client: s3)
    ps_url = signer.presigned_url(
      :put_object,
      bucket: Rails.application.credentials[aws_env][:bucket],
      key: key,
      content_type: params[:filetype]
    )
    data = { url: ps_url, s3Key: key }
    render json: data, status: 200
  end

  private

  def social_params
    params.permit(:location, :company, :position, :fname, :lname, :offset, :limit, :filter)
  end
end

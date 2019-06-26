# require_relative '../concerns/devise_controller_patch.rb'
class Api::SalesContactsController < ApiController
  # include DeviseControllerPatch
  before_action :authenticate_user
  # before_action :set_ref_opp, only: [:show]

  SEARCH_MAP = {
    "fname" => :fname,
    "lname" => :lname,
    "position" => :position,
    "location" => :location,
    "company" => :company
  }
  def search
    network = @current_user.sales_networks.first
    @sales_contacts = network.member_contacts
      .includes(:friends)
      .where.not(fname: '')
    #Parse Results
    SEARCH_MAP.each do |key, value|
      if social_params[value].present?
        @sales_contacts = @sales_contacts.where("LOWER(sales_contacts.#{key}) LIKE ?", "%#{social_params[value]}%") 
      end
    end
    #Filter Results
    @total = @sales_contacts.count
    offset, limit = social_params[:offset], social_params[:limit]
    @sales_contacts = @sales_contacts[offset...(offset+limit)]
    #Get Companion information
    friends = Array.new()
    @friend_map = @sales_contacts.reduce({}) do |acc, contact|
      contact_friends = contact.friends
        .where.not(users: {id: @current_user.id})
        .pluck(:id)
      friends += contact_friends
      acc[contact.id] = contact_friends
      acc
    end
    @friend_users = User.where(id: friends)
   
    render :index
  end

  def connect_social
    inputs = params[:connect_social] 
    import_hash = {}
    inputs.each do |key, upload|
      case key
      when "linked_in_key"
        # parsedFile = CSV.parse(upload.read, headers: true)
        import_hash[key] = upload
        # debugger
      when "google_users_array"
        parsed_array = JSON.parse(upload)
        import_hash[key] = parsed_array
      else
      end
    end
    ConnectSocialJob.perform_later(import_hash, @current_user)

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
      # content_type: "application/octet-stream"
    )
    data = { url: ps_url, key: key }
    # data = { url: ps_url.url, url_fields: ps_url.fields }
    render json: data, status: 200
  end

  private

  def social_params
    params.permit(:location, :company, :position, :fname, :lname, :offset, :limit)
  end
end

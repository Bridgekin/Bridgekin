# require_relative '../concerns/devise_controller_patch.rb'
class Api::SalesContactsController < ApiController
  # include DeviseControllerPatch
  before_action :authenticate_user
  # before_action :set_ref_opp, only: [:show]

  def search_by_name
    network = @current_user.sales_networks.first
    @sales_contacts = network.member_contacts
      .where.not(sales_contacts: 
        {id: @current_user.sales_contacts.pluck(:id)
      })
    #Filter Contacts
    @sales_contacts = @sales_contacts.where("LOWER(sales_contacts.fname) LIKE ?", "%#{social_params[:fname]}%") if social_params[:fname].present? 
    @sales_contacts = @sales_contacts.where("LOWER(sales_contacts.lname) LIKE ?", "%#{social_params[:lname]}%") if social_params[:lname].present? 

    render :index
  end

  def search_by_characteristic
    network = @current_user.sales_networks.first
    @sales_contacts = network.member_contacts
      .where.not(sales_contacts: 
        {id: @current_user.sales_contacts.pluck(:id)
      })
    #Filter Contacts
    @sales_contacts = @sales_contacts.where("LOWER(sales_contacts.title) LIKE ?", "%#{social_params[:title]}%") if social_params[:title].present?
    @sales_contacts = @sales_contacts.where("LOWER(sales_contacts.position) LIKE ?", "%#{social_params[:position]}%") if social_params[:position].present?
    @sales_contacts = @sales_contacts.where("LOWER(sales_contacts.company) LIKE ?", "%#{social_params[:company]}%") if social_params[:company].present?  
    
    render :index
  end

  private

  def social_params
    params.permit(:title, :company, :position, :fname, :lname)
  end
end

class Api::CypressTestsController < ApiController
  before_action :authenticate_user
  before_action :verify_test_database

  def first_five_contacts
    @sales_contacts = @current_user.sales_contacts.limit(5)
    render :first_five_contacts
  end

  def first_managed_network
    @sales_network = @current_user.managed_sales_networks.first
    render :first_managed_network
  end

  def received_intro_request
    @sales_intro = @current_user.intro_requests_received.first
    render :received_intro_request
  end

  private

  def verify_test_database
    head :unauthorized unless Rails.env.test?
  end

end

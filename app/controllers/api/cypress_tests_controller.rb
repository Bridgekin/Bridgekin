class Api::CypressTestsController < ApiController
  before_action :authenticate_user
  before_action :verify_test_database

  def first_five_contacts
    @sales_contacts = @current_user.sales_contacts.limit(5)
    render :first_five_contacts
  end

  private

  def verify_test_database
    head :unauthorized unless Rails.env.test?
  end

end

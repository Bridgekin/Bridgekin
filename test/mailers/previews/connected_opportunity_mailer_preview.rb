# Preview all emails at http://localhost:3000/rails/mailers/connected_opportunity_mailer
class ConnectedOpportunityMailerPreview < ActionMailer::Preview
  def register_email
    ConnectedOpportunityMailer.make_connection(ConnectedOpportunity.first)
  end
end

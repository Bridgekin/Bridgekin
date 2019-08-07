class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable
         # :jwt_authenticatable,jwt_revocation_strategy: JWTBlacklist

  validates :fname, presence: true
  validates :email, uniqueness: { case_sensitive: false }
  validates :phone_number, uniqueness: { allow_blank: :true}

  # has_many :opportunities,
  #   foreign_key: :owner_id,
  #   class_name: :Opportunity

  # has_many :connected_opportunities,
  #   foreign_key: :user_id,
  #   class_name: :ConnectedOpportunity

  # has_many :opportunity_connections,
  #   through: :connected_opportunities,
  #   source: :opportunity

  # has_many :finalized_opportunities,
  #   foreign_key: :user_id,
  #   class_name: :FinalizedOpportunity

  # has_many :saved_opportunities,
  #   foreign_key: :user_id,
  #   class_name: :SavedOpportunity

  # has_many :facilitated_opportunities,
  #   foreign_key: :facilitator_id,
  #   class_name: :ConnectedOpportunity

  # has_many :opportunity_connections_facilitated,
  #   through: :facilitated_opportunities,
  #   source: :opportunity

  # has_many :facilitated_deals,
  #   foreign_key: :facilitator_id,
  #   class_name: :FinalizedOpportunity

  # has_many :user_networks,
  #   foreign_key: :member_id,
  #   class_name: :UserNetwork

  # has_many :member_networks,
  #   through: :user_networks,
  #   source: :network

  # has_many :network_admins,
  #   foreign_key: :admin_id,
  #   class_name: :NetworkAdmin

  # has_many :managed_networks,
  #   through: :network_admins,
  #   source: :network

  # has_many :referral_links,
  #   foreign_key: :member_id,
  #   class_name: :ReferralLink

  # has_one :recieved_referral,
  #   foreign_key: :recipient_id,
  #   class_name: :ReferralLink
  
  # has_many :requested_connections,
  #   foreign_key: :user_id,
  #   class_name: :Connection
  
  # has_many :received_connections,
  #   foreign_key: :friend_id,
  #   class_name: :Connection
  
  # has_many :user_circles,
  #   foreign_key: :member_id,
  #   class_name: :UserCircle
  #
  # has_many :member_circles,
  #   through: :user_circles,
  #   source: :circle
  
  # has_many :circles,
  #   foreign_key: :owner_id,
  #   class_name: :Circle,
  #   dependent: :destroy
  
  # has_many :circle_connections,
  #   through: :circles,
  #   source: :circle_connections
  
  # has_many :connections_for_circles,
  #   through: :circle_connections,
  #   source: :connection
  
  has_one_attached :profile_pic
  
  # has_many :notifications,
  #   foreign_key: :recipient_id,
  #   class_name: :Notification
  
  # has_many :notifications_acted,
  #   foreign_key: :actor_id,
  #   class_name: :Notification
  
  # has_one :notification_setting,
  #   foreign_key: :user_id,
  #   class_name: :NotificationSetting
  
    # has_one :notification_setting,
    #   foreign_key: :user_id,
    #   class_name: :EmailNotification
    #   # dependent: :destroy
  
  # has_many :passed_opportunities,
  #   foreign_key: :user_id,
  #   class_name: :PassedOpportunity

  has_one :user_feature,
    foreign_key: :user_id,
    class_name: :UserFeature

  # has_many :ref_opportunities,
  #   foreign_key: :owner_id,
  #   class_name: :RefOpportunity

  # has_many :ref_opp_links,
  #   foreign_key: :owner_id,
  #   class_name: :RefOppLink

  # has_many :sales_user_networks,
  #   foreign_key: :user_id,
  #   class_name: :SalesUserNetwork

  has_many :sales_user_permissions,
    foreign_key: :user_id,
    class_name: :SalesUserPermission

  # has_many :sales_networks,
  #   through: :sales_user_networks,
  #   source: :network

  #Networks I have access to
  has_many :sales_networks,
    through: :sales_user_permissions,
    source: :permissable,
    source_type: "SalesNetwork"

  #Users I have access to
  has_many :accessable_users,
    through: :sales_user_permissions,
    source: :permissable,
    source_type: "User"

  #People who I've given access to
  has_many :shared_with_permissions,
    as: :permissable

  has_many :shared_with_users,
    through: :shared_with_permissions,
    source: :user


  has_many :sales_user_contacts,
    foreign_key: :user_id,
    class_name: :SalesUserContact

  has_many :sales_contacts,
    through: :sales_user_contacts,
    source: :contact

  has_many :intro_requests_sent,
    foreign_key: :requestor_id,
    class_name: :SalesIntro

  has_many :intro_requests_received,
    foreign_key: :recipient_id,
    class_name: :SalesIntro

  has_many :payments,
    foreign_key: :user_id,
    class_name: :StripePayment

  has_many :paid_subscriptions,
    foreign_key: :payer_id,
    class_name: :StripePayment

  has_many :owned_subscriptions,
    as: :targetable

  has_many :sales_admin_networks,
    foreign_key: :admin_id,
    class_name: :SalesAdminNetwork

  has_many :managed_sales_networks,
    through: :sales_admin_networks,
    source: :network

  has_one :stripe_details,
    foreign_key: :user_id,
    class_name: :StripeDetail

  has_many :request_templates,
    foreign_key: :user_id,
    class_name: :RequestTemplate

  has_many :sent_invites,
    foreign_key: :sender_id,
    class_name: :User
  
  has_many :received_invites,
    foreign_key: :recipient_id,
    class_name: :User
  
  # def contacts_from_requests
  #   SalesIntro.includes(:contact).where("requestor_id = ? OR recipient_id = ?", self.id, self.id).pluck(:contact_id)
  # end

  def self.determine_end_date(time)
    return nil unless time.is_a?(ActiveSupport::Duration)
    now = DateTime.now
    rounded = now.beginning_of_hour + 1.hour
    if rounded.hour > 17
      rounded = rounded.beginning_of_day + 1.day + 17.hour
    else
      diff = 17 - rounded.hour
      rounded += diff.hour
    end
    rounded + time
  end

  def save_from_invite(sales_invite)
    network = sales_invite.network
    relationship = sales_invite.relationship
    ActiveRecord::Base.transaction do
      self.save!
      sales_user_permission = SalesUserPermission.create!(user: self, permissable: network, relationship: relationship, status: "confirmed" last_confirmed: DateTime.now)

      sales_invite.update!(recipient: self, user_permission: sales_user_permission)
    end
    true
  rescue => e
    logger.error "Error saving to network:#{e.message}"
    errors.add(:base, e.message)
    false
  end

  def save_new_admin_network(domain_params, purchase_params) # address_params)
    return false if invalid?
    @sales_network = SalesNetwork.new(domain_params)
    end_date = User.determine_end_date(1.week)
    
    ActiveRecord::Base.transaction do
      self.save!
      @sales_network.save!
      #Attach to existing network
      self.sales_user_permissions.create!(permissable: @sales_network, relationship: "both", status: "confirmed", last_confirmed: DateTime.now)
      #Attach admin user
      self.sales_admin_networks.create!(network: @sales_network)
      #Create a customer
      customer = Stripe::Customer.create({
        # address: {
        #   line1: address_params[:line1],
        #   city: address_params[:city],
        #   state: address_params[:state],
        #   postal_code: address_params[:zipcode]
        # },
        source: purchase_params[:token_id],
        email: self.email
      })
      customerId = customer.id
      #Add stripe customer Id and customer address 
      StripeDetail.create!({
        customer_id: customerId,
        user: self,
      })
      #Track subscription
      subscription = Subscription.create!({
        targetable: @sales_network,
        payer: self,
        product_id: purchase_params[:product_id],
        duration: purchase_params[:duration],
        renewal: purchase_params[:renewal],
        end_date: end_date,
        sub_type: "trial"
      })
    end

    true
  rescue Stripe::CardError => e
    # Since it's a decline, Stripe::CardError will be caught
    body = e.json_body
    err  = body[:error]
    logger.error "Status is: #{e.http_status}"
    logger.error "Type is: #{err[:type]}"
    logger.error "Charge ID is: #{err[:charge]}"

    errors.add(:base, e.message)
    logger.error("Sales admin creation failed. current_user: #{self.id}, Errors: #{errors.full_messages.to_s}")
    return false
  rescue Stripe::RateLimitError => e
    # Too many requests made to the API too quickly
    logger.error "Rate Limit Reached"
    errors.add(:base, e.message)
    logger.error("Sales admin creation failed. current_user: #{self.id}, Errors: #{errors.full_messages.to_s}")
    return false
  rescue Stripe::InvalidRequestError => e
    # Invalid parameters were supplied to Stripe's API
    logger.error "Invalid params"
    errors.add(:base, e.message)
    logger.error("Sales admin creation failed. current_user: #{self.id}, Errors: #{errors.full_messages.to_s}")
    return false
  rescue Stripe::AuthenticationError => e
    # Authentication with Stripe's API failed
    # (maybe you changed API keys recently)
    logger.error "Authentication error (probably because of API key)"
    errors.add(:base, e.message)
    logger.error("Sales admin creation failed. current_user: #{self.id}, Errors: #{errors.full_messages.to_s}")
    return false
  rescue Stripe::APIConnectionError => e
    # Network communication with Stripe failed
    logger.error "Network comms error with Stripe"
    errors.add(:base, e.message)
    logger.error("Sales admin creation failed. current_user: #{self.id}, Errors: #{errors.full_messages.to_s}")
    return false
  rescue Stripe::StripeError => e
    # Display a very generic error to the user, and maybe send yourself an email
    logger.error "Authentication error (probably because of API key)"
    errors.add(:base, e.message)
    logger.error("Sales admin creation failed. current_user: #{self.id}, Errors: #{errors.full_messages.to_s}")
    return false
  rescue => e
    # Something else happened, completely unrelated to Stripe
    logger.error "Something else happened: #{e.message}"
    errors.add(:base, e.message)
    logger.error("Sales admin creation failed. current_user: #{self.id}, Errors: #{errors.full_messages.to_s}")
    return false
  end

  def post_auth_setup
    implement_trackable
    #Get User feature set
    user_feature = self.user_feature ||
      UserFeature.create(user_id: self.id)
    #Create array of user info
    users = [self]
    return user_feature, users
  end

  def confirmed?
    self.confirmed_at.present?
  end

  def implement_trackable
    self[:last_sign_in_at] = self[:current_sign_in_at] || DateTime.now
    self[:current_sign_in_at] = DateTime.now

    self[:sign_in_count] += 1
    self.save
  end

  def decrement_invite_count
    self.invites_remaining -= 1
    self.save
  end

  # def send_weekly_email
  #   seven_days_ago = DateTime.now - 7
  #   new_opportunities = Opportunity.joins(:opp_permissions)
  #     .where(opp_permissions: {
  #       shareable_id: self.member_networks.pluck(:id),
  #       shareable_type: "Network" })
  #     .where("opportunities.created_at >= ?", seven_days_ago )
  #   NotificationMailer.weekly_update(self, new_opportunities.count).deliver_now
  # end
end

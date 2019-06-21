class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable
         # :jwt_authenticatable,jwt_revocation_strategy: JWTBlacklist

  validates :fname, presence: true
  validates :email, uniqueness: { case_sensitive: false }
  validates :phone_number, uniqueness: { allow_blank: :true}

  has_many :opportunities,
    foreign_key: :owner_id,
    class_name: :Opportunity

  has_many :connected_opportunities,
    foreign_key: :user_id,
    class_name: :ConnectedOpportunity

  has_many :opportunity_connections,
    through: :connected_opportunities,
    source: :opportunity

  has_many :finalized_opportunities,
    foreign_key: :user_id,
    class_name: :FinalizedOpportunity

  has_many :saved_opportunities,
    foreign_key: :user_id,
    class_name: :SavedOpportunity

  has_many :facilitated_opportunities,
    foreign_key: :facilitator_id,
    class_name: :ConnectedOpportunity

  has_many :opportunity_connections_facilitated,
    through: :facilitated_opportunities,
    source: :opportunity

  has_many :facilitated_deals,
    foreign_key: :facilitator_id,
    class_name: :FinalizedOpportunity

  has_many :user_networks,
    foreign_key: :member_id,
    class_name: :UserNetwork

  has_many :member_networks,
    through: :user_networks,
    source: :network

  has_many :network_admins,
    foreign_key: :admin_id,
    class_name: :NetworkAdmin

  has_many :managed_networks,
    through: :network_admins,
    source: :network

  has_many :referral_links,
    foreign_key: :member_id,
    class_name: :ReferralLink

  has_one :recieved_referral,
    foreign_key: :recipient_id,
    class_name: :ReferralLink

  has_one :notification_setting,
    foreign_key: :user_id,
    class_name: :EmailNotification
    # dependent: :destroy

  has_many :requested_connections,
    foreign_key: :user_id,
    class_name: :Connection

  has_many :received_connections,
    foreign_key: :friend_id,
    class_name: :Connection

  # has_many :user_circles,
  #   foreign_key: :member_id,
  #   class_name: :UserCircle
  #
  # has_many :member_circles,
  #   through: :user_circles,
  #   source: :circle

  has_many :circles,
    foreign_key: :owner_id,
    class_name: :Circle,
    dependent: :destroy

  has_many :circle_connections,
    through: :circles,
    source: :circle_connections

  has_many :connections_for_circles,
    through: :circle_connections,
    source: :connection

  has_one_attached :profile_pic

  has_many :notifications,
    foreign_key: :recipient_id,
    class_name: :Notification

  has_many :notifications_acted,
    foreign_key: :actor_id,
    class_name: :Notification

  has_one :notification_setting,
    foreign_key: :user_id,
    class_name: :NotificationSetting

  has_many :passed_opportunities,
    foreign_key: :user_id,
    class_name: :PassedOpportunity

  has_one :user_feature,
    foreign_key: :user_id,
    class_name: :UserFeature

  has_many :ref_opportunities,
    foreign_key: :owner_id,
    class_name: :RefOpportunity

  has_many :ref_opp_links,
    foreign_key: :owner_id,
    class_name: :RefOppLink

  has_many :sales_user_networks,
    foreign_key: :user_id,
    class_name: :SalesUserNetwork

  has_many :sales_networks,
    through: :sales_user_networks,
    source: :network

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

  # def contacts_from_requests
  #   SalesIntro.includes(:contact).where("requestor_id = ? OR recipient_id = ?", self.id, self.id).pluck(:contact_id)
  # end

  def submitted_apps
    RefApplication.where("candidate_id = ? OR direct_referrer_id = ?", self.id, self.id)
  end

  def connections
    Connection.includes(:requestor, :recipient)
    .where("user_id = ? OR friend_id = ?", self.id, self.id)
  end

  def friends
    self.connections.where(status: 'Accepted')
    .reduce([]) do |arr, connection|
      if connection.requestor.id == self.id
        arr << connection.recipient
      else
        arr << connection.requestor
      end
    end
  end

  def circles_with_at_least_one_member
    circles_hash = self.circle_connections.reduce({}) do |acc, circle_connection|
      circle_id = circle_connection.circle_id
      unless acc[circle_id]
        acc[circle_id] = Array.new
      end
      acc[circle_id] << circle_connection.connection_id
      acc
    end

    self.circles.where(id: circles_hash.keys)
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

  def get_template
    networks = self.member_networks.where(parent_id: nil)
    bridgekin_template = Network.find_by(title: 'Bridgekin').site_template

    return bridgekin_template
    # if networks.length == 0
    #   return bridgekin_template
    # elsif self.default_network_id.nil?
    #   return networks.last.site_template || bridgekin_template
    # else
    #   return Network.find(self.default_network_id).site_template || bridgekin_template
    # end

    # if self.default_network_id.nil?
    #   networks.last.site_template #|| {network_id: networks.last.id}
    # else
    #   Network.find(self.default_network_id).site_template #|| {network_id: self.default_network_id}
    # end
  end

  def set_networks(network)
    if network.title != 'Bridgekin'
      UserNetwork.create(network_id: network.id, member_id: self.id)
      self.default_network_id = network.id
      self.save
    end
    #Create Bridgekin Connection
    bridgekin = Network.find_by(title: 'Bridgekin')
    UserNetwork.create(network_id: bridgekin.id, member_id: self.id)
  end

  def update_waitlist
    waitlist_user = WaitlistUser.find_by(email: self.email)
    if waitlist_user
      waitlist_user[:status] = 'Full'
      waitlist_user.save
    end
  end

  def set_connections(referral_link)
    waitlist_user = WaitlistUser.includes(:referrals)
      .find_by(email: self.email)

    if waitlist_user
      referral_ids = waitlist_user.referrals.pluck(:from_referral_id)
      connection_array = referral_ids.map do |referral_id|
        { user_id: referral_id, friend_id: self.id, status: 'Accepted'}
      end
      Connection.create(connection_array)
    end

    if referral_link.is_friendable
      admin = User.find_by(email: 'joe@bridgekin.com')
      if admin
        # Connection.create( user_id: self.id, status: 'Accepted',
        #   friend_id: referral_link.member_id )
        Connection.create( user_id: self.id, status: 'Accepted',
          friend_id: admin.id )
      end
    end
  end

  def decrement_invite_count
    self.invites_remaining -= 1
    self.save
  end

  def opportunities_received
    connections = self.requested_connections.includes(:opportunities) +
      self.received_connections.includes(:opportunities)
    networks = self.member_networks

    opps_from_networks = Opportunity.includes(:owner)
      .joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Network'")
      .where(opp_permissions: { shareable_id: networks.pluck(:id)})
      .where(status: 'Approved')
      .where.not(deal_status: 'Deleted', owner_id: self.id)

    opps_from_connections = Opportunity.includes(:owner)
      .joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'")
      .where(opp_permissions: { shareable_id: connections.pluck(:id)})
      .where(status: 'Approved')
      .where.not(deal_status: 'Deleted', owner_id: self.id)

    opps_from_networks + opps_from_connections
  end

  def opportunities_connected
    ConnectedOpportunity.where(user_id: self.id)
      .or(ConnectedOpportunity.where(facilitator_id: self.id))
      .or(ConnectedOpportunity.where(opportunity_id: self.opportunities.pluck(:id)))
  end

  #notifications
  def send_weekly_email
    seven_days_ago = DateTime.now - 7
    new_opportunities = Opportunity.joins(:opp_permissions)
      .where(opp_permissions: {
        shareable_id: self.member_networks.pluck(:id),
        shareable_type: "Network" })
      .where("opportunities.created_at >= ?", seven_days_ago )
    NotificationMailer.weekly_update(self, new_opportunities.count).deliver_now
  end
end

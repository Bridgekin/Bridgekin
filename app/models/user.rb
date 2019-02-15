class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable
         # :jwt_authenticatable,jwt_revocation_strategy: JWTBlacklist

  validates :fname, :lname,  presence: true
  validates :email, uniqueness: { case_sensitive: false }

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
    foreign_key: :network_id,
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

  has_one_attached :profile_pic

  def confirmed?
    self.confirmed_at.present?
  end

  def send_weekly_email
    seven_days_ago = DateTime.now - 7
    new_opportunities = Opportunity.joins(:opportunity_networks)
      .where(opportunity_networks: { network_id: self.member_networks.pluck(:id)})
      .where("opportunities.created_at >= ?", seven_days_ago )
    NotificationMailer.weekly_update(self, new_opportunities.count).deliver_now
  end
end

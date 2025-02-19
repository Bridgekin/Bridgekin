class Network < ApplicationRecord
  validates :title, uniqueness: true, presence: true

  has_many :user_networks,
    foreign_key: :network_id,
    class_name: :UserNetwork,
    dependent: :destroy

  has_many :members,
    through: :user_networks,
    source: :member

  has_many :network_admins,
    foreign_key: :network_id,
    class_name: :NetworkAdmin,
    dependent: :destroy

  has_many :admins,
    through: :network_admins,
    source: :admin

  ###########

  # has_many :opportunity_networks,
  #   foreign_key: :network_id,
  #   class_name: :OpportunityNetwork

  has_many :opp_permissions,
    as: :shareable,
    dependent: :destroy

  has_many :opportunities,
    through: :opp_permissions,
    source: :opportunity

  ###########

  # has_many :opportunities,
  #   through: :opportunity_networks,
  #   source: :opportunity

  has_many :referral_links,
    foreign_key: :network_id,
    class_name: :ReferralLink

  has_many :connected_opportunities,
    foreign_key: :network_id,
    class_name: :ConnectedOpportunity,
    dependent: :destroy

  has_many :finalized_opportunities,
    foreign_key: :network_id,
    class_name: :FinalizedOpportunity,
    dependent: :destroy

  has_one :site_template,
    foreign_key: :network_id,
    class_name: :SiteTemplate

  has_one_attached :picture

  has_many :notifications,
    as: :acted_with,
    dependent: :destroy

  has_many :notifications,
    as: :targetable,
    dependent: :destroy
end

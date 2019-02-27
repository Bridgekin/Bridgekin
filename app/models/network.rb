class Network < ApplicationRecord
  validates :title, uniqueness: true, presence: true

  has_many :user_networks,
    foreign_key: :network_id,
    class_name: :UserNetwork

  has_many :members,
    through: :user_networks,
    source: :member

  has_many :network_admins,
    foreign_key: :network_id,
    class_name: :NetworkAdmin

  has_many :admins,
    through: :network_admins,
    source: :admin

  ###########

  has_many :opportunity_networks,
    foreign_key: :network_id,
    class_name: :OpportunityNetwork

  has_many :opp_permissions, as: :shareable

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
    class_name: :ConnectedOpportunity

  has_many :finalized_opportunities,
    foreign_key: :network_id,
    class_name: :FinalizedOpportunity

  has_one :site_template,
    foreign_key: :network_id,
    class_name: :SiteTemplate
end

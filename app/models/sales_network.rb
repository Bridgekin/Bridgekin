class SalesNetwork < ApplicationRecord
  validates :title, :domain, presence: :true
  validates :title, :domain, uniqueness: :true

  has_many :user_networks,
    foreign_key: :network_id,
    class_name: :SalesUserNetwork,
    dependent: :destroy

  has_many :members,
    through: :user_networks,
    source: :user

  has_many :member_contacts,
    through: :members,
    source: :sales_contacts

  has_many :payments,
    foreign_key: :network_id,
    class_name: :StripePayment

  has_many :subscriptions,
    as: :targetable

  has_many :sales_admin_networks,
    foreign_key: :network_id,
    class_name: :SalesAdminNetwork

  has_many :admins,
    through: :sales_admin_networks,
    source: :admin

  def self.generate_network_details(sales_networks)
    sales_networks.reduce({}) do |acc, network|
      current_sub = network.current_subscription
      details = {
        member_count: network.members.count,
        current_sub_end: current_sub.nil? ? "no sub" : current_sub.end_date
      }
      acc[network.id] = details
      acc
    end
  end

  def current_subscription
    self.subscriptions
      .order(:created_at)
      .reverse.first
  end
end
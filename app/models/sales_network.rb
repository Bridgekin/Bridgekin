class SalesNetwork < ApplicationRecord
  validates :title, :domain, presence: :true
  validates :title, :domain, uniqueness: :true

  # has_many :sales_user_networks,
  #   foreign_key: :network_id,
  #   class_name: :SalesUserNetwork,
  #   dependent: :destroy

  has_many :sales_user_permissions,
    as: :permissable

  # has_many :members,
  #   through: :sales_user_networks,
  #   source: :user

  has_many :members,
    through: :sales_user_permissions,
    source: :user

  has_many :member_contacts,
    through: :members,
    source: :sales_contacts

  has_many :payments,
    foreign_key: :network_id,
    class_name: :StripePayment

  has_many :subscriptions,
    as: :targetable

  has_many :subscribed_products,
    through: :subscriptions,
    source: :product

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
        memberCount: network.members.count,
        currentSubEnd: current_sub.nil? ? "no sub" : current_sub.end_date,
        maxSeats: current_sub.nil? ? "no sub" :
          network.subscribed_products
            .where(id: current_sub.product_id)
            .first.seats
      }
      acc[network.id] = details
      acc
    end
  end
   
  def self.get_network_info(current_user = nil)
    return nil if !current_user.is_a?(User) || current_user.sales_networks.empty?

    sales_networks = current_user.sales_networks
    sales_user_permissions = current_user.sales_user_permissions
    sales_admin_networks = current_user.sales_admin_networks
    # current_network_id = sales_networks.first.id if sales_networks.first
    network_details = SalesNetwork.includes(:members, :admins, :subscribed_products).generate_network_details(sales_networks)

    return sales_networks, sales_user_permissions, sales_admin_networks, network_details
  end

  def get_member_type(current_user = nil)
    return nil unless current_user.is_a?(User)

    user_network = self.sales_user_permissions
      .where(user: current_user)
      .first
    return user_network.member_type if user_network
  end

  def current_subscription
    self.subscriptions
      .order(:created_at)
      .reverse.first
  end
end
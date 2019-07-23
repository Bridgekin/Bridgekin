# # require "NotificationRouter"
# require_relative './concerns/notification_router.rb'
# class Opportunity < ApplicationRecord
#   include NotificationRouter
#   validates :owner_id, :status, presence: true
#   # validates :owner_id, :title, :opportunity_need, :industries,
#   #   :geography, :value, :status, presence: true

#   validates :title, uniqueness: {
#     scope: :owner_id,
#     allow_blank: true,
#     message: "is already taken across your authored opportunities" }

#   belongs_to :owner,
#     foreign_key: :owner_id,
#     class_name: :User

#   has_many :opp_permissions,
#     foreign_key: :opportunity_id,
#     class_name: :OppPermission,
#     dependent: :destroy

#   has_many :networks,
#     through: :opp_permissions,
#     source: :shareable,
#     source_type: 'Network'

#   has_many :connections,
#     through: :opp_permissions,
#     source: :shareable,
#     source_type: 'Connection'

#   ###########

#   # has_many :opportunity_networks,
#   #   foreign_key: :opportunity_id,
#   #   class_name: :OpportunityNetwork,
#   #   dependent: :destroy

#   # has_many :networks,
#   #   through: :opportunity_networks,
#   #   source: :network

#   has_many :connected_opportunities,
#     foreign_key: :opportunity_id,
#     class_name: :ConnectedOpportunity

#   has_many :finalized_opportunities,
#     foreign_key: :opportunity_id,
#     class_name: :FinalizedOpportunity

#   has_many :saved_opportunities,
#     foreign_key: :opportunity_id,
#     class_name: :SavedOpportunity

#   # has_many :passed_opportunities,
#   #   foreign_key: :opportunity_id,
#   #   class_name: :PassedOpportunity

#   has_one_attached :picture

#   has_many :notifications, as: :acted_with
#   has_many :notifications, as: :targetable

#   # serialize       :industries, Array
#   # attr_accessor   :industries_raw

#   def self.profile_index(profile_id, user)
#     opportunities = Opportunity.includes(:owner, :connections, :networks)
#       .where(owner_id: profile_id)
#       .where.not(deal_status: 'Deleted', anonymous: true)

#     opportunities.reduce([]) do |acc, opp|
#       users_shared = Opportunity.all_people_shared(opp)
#       acc << opp if users_shared.include?(user.id)
#       acc
#     end
#   end

#   def self.all_people_shared(opportunity)
#     owner = opportunity.owner
#     connections = opportunity.connections
#     users_shared = connections.reduce([]) do |acc, connection|
#       if connection.user_id == owner.id
#         acc << connection.friend_id
#       else
#         acc << connection.user_id
#       end
#     end

#     networks = Network.includes(:members)
#       .where(id: opportunity.networks.pluck(:id))

#     networks.each do |network|
#       members = network.members.pluck(:id)
#       users_shared += members
#     end

#     users_shared.uniq
#   end

#   def get_title
#     if self.title.empty?
#       if self.description.length > 30
#         self.description.slice(0,30) + "..."
#       else
#         self.description
#       end
#     else
#       self.title
#     end
#   end

#   def industries_raw
#     self.industries.join(",") unless self.industries.nil?
#   end

#   def industries_raw=(values)
#     self.industries = []
#     self.industries=values.split(",")
#   end

#   def geography_raw
#     self.geography.join(",") unless self.geography.nil?
#   end

#   def set_permissions(permsString)
#     #Example: All-Network, Network #1, All-Circle
#     new_permissions = permsString.split(',')
#     current_permissions = self.opp_permissions
#     old_permissions = current_permissions.reduce([]) do |arr, perm|
#       arr << "#{perm.shareable_id}-#{perm.shareable_type}"
#     end

#     distilled_new_perms = distill_perms(new_permissions)

#     add_perms = distilled_new_perms - old_permissions
#     remove_perms = old_permissions - distilled_new_perms

#     update_permissions(add_perms, remove_perms, new_permissions.include?("-Connection"))
#   end

#   def distill_perms(new_permissions)
#     #Fill empty set with new perms
#     user = User.find(self.owner_id)
#     new_permissions.reduce(Set.new()) do |acc, perm|
#       split = perm.split('-')
#       if split.first == ''
#         acc = Set.new((acc.to_a) | find_for_all_perms(split.last, user))
#       elsif split.last == "Circle"
#         acc = Set.new((acc.to_a) | find_for_circle(split.first, user))
#       else
#         acc << perm
#       end
#     end.to_a
#   end

#   def find_for_circle(circle_id, user)
#     circle_connections = Circle.find(circle_id).connections

#     # connections = Connection.where(user_id: circle_members_ids, friend_id: user.id)
#     #   .or(Connection.where(friend_id: circle_members_ids, user_id: user.id))
#     # debugger
#     circle_connections.pluck(:id).reduce([]){|acc, id| acc << "#{id}-Connection"}
#   end

#   def find_for_all_perms(type, user)
#     case type
#     when 'Everyone'
#       network_ids = user.member_networks.pluck(:id)
#       network_ids.reduce([]){|acc, id| acc << "#{id}-Network"}
#     when 'Network'
#       network_ids = user.member_networks.pluck(:id)
#       network_ids.reduce([]){|acc, id| acc << "#{id}-Network"}
#     when 'Connection'
#       connection_ids = user.connections.where(status: 'Accepted').pluck(:id)
#       connection_ids.reduce([]){|acc, id| acc << "#{id}-Connection"}
#     when 'Circle'
#       # circle_members_ids = user.circles.includes(:members)
#       #   .reduce(Set.new()) do |acc, circle|
#       #     Set.new((acc.to_a) | circle.members.pluck(:id))
#       #   end.to_a
#       circle_connections = user.connections_for_circles

#       # connections = Connection.where(user_id: circle_members_ids, friend_id: user.id)
#       #   .or(Connection.where(friend_id: circle_members_ids, user_id: user.id))
#       # debugger
#       circle_connections.pluck(:id).reduce([]){|acc, id| acc << "#{id}-Connection"}
#     else
#       puts "Error: Something went wrong!!!!"
#     end
#   end

#   def update_permissions(add_perms, remove_perms, massBoolean)
#     added_perm_ids = []

#     add_perms.each do |perm|
#       perm = perm.split('-')
#       oppPerm = OppPermission.create(
#         opportunity_id: self.id,
#         shareable_id: perm.first,
#         shareable_type: perm.last,
#         mass: (massBoolean && perm.last == 'Connection')
#       )
#       added_perm_ids << oppPerm.id
#     end

#     send_opportunity_notifications(self, added_perm_ids)

#     remove_perms.each do |perm|
#       perm = perm.split('-')
#       OppPermission.where(
#           opportunity_id: self.id,
#           shareable_id: perm.first,
#           shareable_type: perm.last
#         ).destroy_all
#     end
#   end

#   def send_notification

#   end

#   # def reset_sharing(networks, connections, circles)
#   #   #delete existing connections
#   #   self.opportunity_networks.delete_all
#   #
#   #   #create new network connections
#   #   network_params = networks.split(',')
#   #   network_params.reduce([]) do |arr, network_id|
#   #     arr << OpportunityNetwork.create(
#   #       opportunity_id: self.id,
#   #       network_id: network_id
#   #     )
#   #   end
#   # end
# end

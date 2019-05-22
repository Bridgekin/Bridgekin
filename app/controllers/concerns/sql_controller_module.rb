module SQLControllerModule
  def fetch_all_opp_permissions
    connections = @user.connections.where(status: 'Accepted')

    #Waterfalled Permissions
    direct_opp_perms = OppPermission.includes(:opportunity)
      .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
      .where(shareable_id: connections.pluck(:id),
        shareable_type: "Connection",
        mass: false,
        opportunities: {status: 'Approved'})
      .where.not(
        opportunity_id: @user.passed_opportunities.pluck(:opportunity_id),
        opportunities: {deal_status: 'Deleted', owner_id: @user })

    indirect_opp_perms = OppPermission.includes(:opportunity)
      .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
      .where(shareable_id: connections.pluck(:id),
        shareable_type: "Connection",
        mass: true,
        opportunities: {status: 'Approved'})
      .where.not(
        opportunity_id: @user.passed_opportunities.pluck(:opportunity_id),
        opportunities: {deal_status: 'Deleted', owner_id: @user })
        # opportunity_id: direct_opp_perms.pluck(:opportunity_id),

    network_opp_perms = OppPermission.includes(:opportunity)
      .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
      .where(shareable_id: @workspace_networks.pluck(:id),
        shareable_type: "Network",
        opportunities: {status: 'Approved'})
      .where.not(
        opportunity_id: @user.passed_opportunities.pluck(:opportunity_id),
        opportunities: {deal_status: 'Deleted', owner_id: @user})
        # opportunity_id: direct_opp_perms.pluck(:opportunity_id),
        # opportunity_id: indirect_opp_perms.pluck(:opportunity_id),
    
    # debugger
    #Pull out opportunities
    all_perms = direct_opp_perms + indirect_opp_perms + network_opp_perms
    all_opportunities = all_perms.map{|perm| perm.opportunity}

    return all_perms, all_opportunities
    # return direct_opp_perms,
    #   indirect_opp_perms,
    #   network_opp_perms,
    #   all_opportunities
  end

  def opps_all_networks
    # Opportunity.includes(:owner)
    #   .joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Network'")
    #   .where(opp_permissions: { shareable_id: @workspace_networks.pluck(:id)})
    #   .where(status: 'Approved')
    #   .where.not(deal_status: 'Deleted')
    #   .where.not(id: @user.passed_opportunities.pluck(:opportunity_id))
    #   .order(created_at: :desc)

    network_opp_perms = OppPermission.includes(:opportunity)
      .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
      .where(shareable_id: @workspace_networks.pluck(:id),
        shareable_type: "Network",
        opportunities: { status: 'Approved'})
      .where.not(
        opportunity_id: @user.passed_opportunities.pluck(:opportunity_id),
        opportunities: { deal_status: 'Deleted', owner_id: @user })
  end

  def opps_network_id(network_id)
    # Opportunity.includes(:owner)
    #   .joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Network'")
    #   .where(opp_permissions: { shareable_id: network_id })
    #   .where(status: 'Approved')
    #   .where.not(deal_status: 'Deleted')
    #   .where.not(id: @user.passed_opportunities.pluck(:opportunity_id))
    #   .order(created_at: :desc)

    network_opp_perms = OppPermission.includes(:opportunity)
      .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
      .where(shareable_id: network_id,
        shareable_type: "Network",
        opportunities: {status: 'Approved'})
      .where.not(
        opportunity_id: @user.passed_opportunities.pluck(:opportunity_id),
        opportunities: {deal_status: 'Deleted', owner_id: @user })
  end

  # def opps_all_circles
  #   circle_members_ids = @user.circles.includes(:members)
  #     .reduce(Set.new()) do |acc, circle|
  #       Set.new((acc.to_a) | circle.members.pluck(:id))
  #     end.to_a
  #
  #   connections = Connection.where(user_id: circle_members_ids, friend_id: @user.id)
  #     .or(Connection.where(friend_id: circle_members_ids, user_id: @user.id))
  #
  #   # Opportunity.includes(:owner)
  #   #   .joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'")
  #   #   .joins("INNER JOIN connections on connections.id = opp_permissions.shareable_id")
  #   #   .where(opp_permissions: { shareable_id: connections.pluck(:id) })
  #   #   .where.not(id: @user.passed_opportunities.pluck(:opportunity_id))
  #
  #   opp_perms = OppPermission.includes(:opportunity)
  #     .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
  #     .where(shareable_id: connections.pluck(:id),
  #       shareable_type: "Connection",
  #       mass: false,
  #       opportunities: {status: 'Approved'})
  #     .where.not(
  #       opportunity_id: @user.passed_opportunities.pluck(:opportunity_id),
  #       opportunities: {deal_status: 'Deleted'})
  # end
  #
  # def opps_circle_id(circle_id)
  #   circle_members_ids = Circle.find(circle_id).members
  #
  #   connections = Connection.where(user_id: circle_members_ids, friend_id: @user.id)
  #     .or(Connection.where(friend_id: circle_members_ids, user_id: @user.id))
  #
  #   # Opportunity.includes(:owner)
  #   #   .joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'")
  #   #   .joins("INNER JOIN connections on connections.id = opp_permissions.shareable_id")
  #   #   .where(opp_permissions: { shareable_id: connections.pluck(:id) })
  #   #   .where.not(id: @user.passed_opportunities.pluck(:opportunity_id))
  #
  #   opp_perms = OppPermission.includes(:opportunity)
  #     .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
  #     .where(shareable_id: connections.pluck(:id),
  #       shareable_type: "Connection",
  #       mass: false,
  #       opportunities: {status: 'Approved'})
  #     .where.not(
  #       opportunity_id: @user.passed_opportunities.pluck(:opportunity_id),
  #       opportunities: {deal_status: 'Deleted'})
  # end

  def opps_direct_connections
    # Find all connections
    connections = @user.connections.where(status: 'Accepted')
    # Opportunity.includes(:owner)
    #   .joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'")
    #   .joins("INNER JOIN connections on connections.id = opp_permissions.shareable_id")
    #   .where(opp_permissions: { shareable_id: connections.pluck(:id) })
    #   .where(opp_permissions: { mass: false })
    #   .where.not(id: @user.passed_opportunities.pluck(:opportunity_id))

    direct_opp_perms = OppPermission.includes(:opportunity)
      .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
      .where(shareable_id: connections.pluck(:id),
        shareable_type: "Connection",
        mass: false,
        opportunities: {status: 'Approved'})
      .where.not(
        opportunity_id: @user.passed_opportunities.pluck(:opportunity_id),
        opportunities: {deal_status: 'Deleted', owner_id: @user })
  end

  def opps_all_connections
    connections = @user.connections.where(status: 'Accepted')
    # Opportunity.includes(:owner)
    #   .joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'")
    #   .joins("INNER JOIN connections on connections.id = opp_permissions.shareable_id")
    #   .where(opp_permissions: { shareable_id: connections.pluck(:id) })
    #   .where(opp_permissions: { mass: true })
    #   .where.not(id: @user.passed_opportunities.pluck(:opportunity_id))

    indirect_opp_perms = OppPermission.includes(:opportunity)
      .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
      .where(shareable_id: connections.pluck(:id),
        shareable_type: "Connection",
        mass: true,
        opportunities: {status: 'Approved'})
      .where.not(
        opportunity_id: @user.passed_opportunities.pluck(:opportunity_id),
        opportunities: {deal_status: 'Deleted', owner_id: @user })
  end
end

# opportunity_ids = connections.reduce(Set.new()) do |acc, conn|
#   Set.new((acc.to_a) | conn.opportunities.where.not(owner_id: u.id).pluck(:id))
# end.to_a

# workspace_members = User.joins(:user_networks).where(user_networks: { network_id: workspace_networks.pluck(:id)})
#
# workspace_networks = Network.where(workspace_id: 1).where(id: u.member_networks).or(Network.where(id: 1).where(id: u.member_networks)).includes(:opportunities)
#
# direct_opps = Opportunity.includes(:owner).joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'").joins("INNER JOIN connections on connections.id = opp_permissions.shareable_id").where(connections: {user_id: u.id,friend_id: workspace_members.pluck(:id)}).or(Opportunity.includes(:owner).joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'").joins("INNER JOIN connections on connections.id = opp_permissions.shareable_id").where(connections: {friend_id: u.id,user_id: (workspace_members.uniq.pluck(:id)) - [u.id] }))
#
# u.connections.includes(:opportunities).reduce(Set.new()){|acc,con| acc << con.opportunities}

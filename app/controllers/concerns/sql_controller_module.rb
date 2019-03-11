module SQLControllerModule
  def opps_all_networks
    Opportunity.joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Network'")
      .includes(:owner)
      .where(opp_permissions: { shareable_id: [@workspace_networks.pluck(:id), nil]})
      .where(status: 'Approved')
      .where.not(deal_status: 'Deleted')
      .order(created_at: :desc)
  end

  def opps_direct_connections
    Opportunity.joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'")
      .joins("LEFT JOIN connections on connections.id = opp_permissions.shareable_id")
      .includes(:owner)
      .where(connections: {
        user_id: @workspace_network_members.pluck(:id),
        friend_id: @workspace_network_members.pluck(:id)
      })
      .where(status: 'Approved')
      .where.not(deal_status: 'Deleted')
      .order(created_at: :desc)
  end

  def opps_all_connections
    direct = Opportunity.joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'")
      .joins("LEFT JOIN connections on connections.id = opp_permissions.shareable_id")
      .includes(:owner)
      .where(connections: {
        user_id: @workspace_network_members.pluck(:id),
        friend_id: @workspace_network_members.pluck(:id)
      })
      .where(status: 'Approved')
      .where.not(deal_status: 'Deleted')
      .order(created_at: :desc)
    all = Opportunity.joins("INNER JOIN opp_permissions on opp_permissions.opportunity_id = opportunities.id AND opp_permissions.shareable_type = 'Connection'")
      .includes(:owner)
      .where(opp_permissions: { shareable_id: nil })
      .where.not(deal_status: 'Deleted')

    direct + all
  end

  def opps_network_id(network_id)
    Network.find(network_id).opportunities
      .includes(:owner)
      .where(status: 'Approved')
      .where.not(deal_status: 'Deleted')
      .order(created_at: :desc)
      # .where(opp_permissions: { sharable_id: network_id,
      #   shareable_type: 'Network' })
      # .where(opportunity_networks: { network_id: network_id})
  end
end

class RemoveNetworksWithinBridgekin < ActiveRecord::Migration[5.2]
  def change
    bridgekin = Network.where(title:'Bridgekin')
    children = Network.where(workspace_id: bridgekin)

    child_permissions = OppPermission.includes(:opportunity)
      .where(shareable_type: 'Network', shareable_id: children)

    child_permissions.each do |perm|
      opp = perm.opportunity
      existing_bridgekin_perm = OppPermission.find_by(
        shareable_type: 'Network',
        shareable_id: bridgekin,
        opportunity_id: opp
      ) || OppPermission.create(
        shareable_type: 'Network',
        shareable_id: bridgekin,
        opportunity_id: opp
      )
    end

    children.destroy_all
  end
end

class UpdateOppPermissionsWithNewRules < ActiveRecord::Migration[5.2]
  def change
    all_network_perms = OppPermission.includes(:opportunity)
      .where(shareable_id: nil, shareable_type: 'Network')

    all_network_perms.each do |perm|
      opp = perm.opportunity
      user = User.includes(:member_networks)
        .find(opp.owner_id)
      network_ids = user.member_networks.pluck(:id)
      network_ids.each {|id| OppPermission.create(
        shareable_id: id, shareable_type: 'Network',
        opportunity_id: opp.id
      )}
    end

    OppPermission.where(shareable_id: nil)
    .delete_all
  end
end

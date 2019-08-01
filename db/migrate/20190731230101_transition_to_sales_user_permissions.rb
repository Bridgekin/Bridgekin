class TransitionToSalesUserPermissions < ActiveRecord::Migration[5.2]
  def change
    SalesUserNetwork.all.each{|un| SalesUserPermission.create(permissable_id: un.network_id, user_id: un.user_id, member_type: un.member_type, permissable_type: "SalesNetwork")}

    logger.info "Finished transitioning from user_network to user_permissions"
  end
end

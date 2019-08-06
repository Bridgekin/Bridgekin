class TransitionToRelationshipFromMemberType < ActiveRecord::Migration[5.2]
  def change
    SalesUserPermission.where(member_type: 'full').update_all(relationship: "both")

    SalesUserPermission.where.not(member_type: 'full').update_all(relationship: "request")

    SalesInvite.where(user_type: 'full').update_all(relationship: "both")

    SalesInvite.where.not(user_type: 'full').update_all(relationship: "request")
  end
end

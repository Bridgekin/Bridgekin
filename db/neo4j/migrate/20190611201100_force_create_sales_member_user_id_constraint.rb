class ForceCreateSalesMemberUserIdConstraint < Neo4j::Migrations::Base
  def up
    add_constraint :SalesMember, :user_id, force: true
  end

  def down
    drop_constraint :SalesMember, :user_id
  end
end

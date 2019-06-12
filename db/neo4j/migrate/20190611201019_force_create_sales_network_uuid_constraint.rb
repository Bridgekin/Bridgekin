class ForceCreateSalesNetworkUuidConstraint < Neo4j::Migrations::Base
  def up
    add_constraint :SalesNetwork, :uuid, force: true
  end

  def down
    drop_constraint :SalesNetwork, :uuid
  end
end

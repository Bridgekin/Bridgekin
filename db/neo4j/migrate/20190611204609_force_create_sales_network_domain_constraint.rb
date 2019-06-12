class ForceCreateSalesNetworkDomainConstraint < Neo4j::Migrations::Base
  def up
    add_constraint :SalesNetwork, :domain, force: true
  end

  def down
    drop_constraint :SalesNetwork, :domain
  end
end

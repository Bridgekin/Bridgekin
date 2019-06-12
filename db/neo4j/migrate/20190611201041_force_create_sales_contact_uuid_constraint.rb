class ForceCreateSalesContactUuidConstraint < Neo4j::Migrations::Base
  def up
    add_constraint :SalesContact, :uuid, force: true
  end

  def down
    drop_constraint :SalesContact, :uuid
  end
end

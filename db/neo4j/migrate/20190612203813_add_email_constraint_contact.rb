class AddEmailConstraintContact < Neo4j::Migrations::Base
  def up
    add_constraint :SalesContact, :email, force: true
  end

  def down
    drop_constraint :SalesContact, :email
  end
end

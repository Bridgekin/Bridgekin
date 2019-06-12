class SalesMember
  include Neo4j::ActiveNode
  include Neo4j::Timestamps

  id_property :user_id
  # property :email, type: String
  
  has_one :out, :network, 
    type: :MEMBER_OF, 
    model_class: :SalesNetwork

  has_many :out, :contacts, 
    type: :KNOWS, 
    model_class: :SalesContact
end

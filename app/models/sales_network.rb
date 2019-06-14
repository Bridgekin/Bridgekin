class SalesNetwork
  # include Neo4j::ActiveNode
  # include Neo4j::Timestamps

  # property :title, type: String
  # property :domain, type: String

  # has_many :in, :members,
  #   origin: :network, 
  #   model_class: :SalesMember
end
json.opportunities do
  @opportunities.each do |opportunity|
    json.set! opportunity.id do
      json.partial! 'api/opportunities/opportunity', opportunity: opportunity
    end
  end
end

json.networkOpps @networkOpps

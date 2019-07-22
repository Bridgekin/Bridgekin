json.saved_opportunities do
  @saved_opportunities.each do |saved_opportunity|
    json.set! saved_opportunity.opportunity_id do
      json.partial! 'api/saved_opportunities/saved_opportunity',
      saved_opportunity: saved_opportunity
    end
  end
end

json.opportunities do
  @saved_opportunities.each do |saved_opportunity|
    json.set! saved_opportunity.opportunity.id do
      json.partial! 'api/opportunities/opportunity',
        opportunity: saved_opportunity.opportunity
    end
  end
end

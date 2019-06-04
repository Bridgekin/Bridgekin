json.ref_opps do
  @ref_opps.each do |ref_opp|
    json.set! ref_opp.id do
      json.partial! 'api/ref_opportunities/ref_opp', ref_opp: ref_opp
    end
  end
end

json.owned_opps @owned_opps
json.ref_applications do
  @ref_applications.each do |ref_application|
    json.set! ref_application.id do
      json.partial! 'api/ref_applications/ref_application', ref_application: ref_application
    end
  end
end

json.submitted_applications @submitted_applications.pluck(:id)
json.owned_applications @owned_applications.pluck(:id)

json.ref_opps do
  @ref_opps.each do |ref_opp|
    json.set! ref_opp.id do
      json.partial! 'api/ref_opportunities/ref_opp', ref_opp: ref_opp
    end
  end
end
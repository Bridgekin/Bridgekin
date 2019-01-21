json.opportunity do |json|
  json.partial! 'api/opportunities/opportunity', opportunity: @opportunity

  json.networks @networks
end

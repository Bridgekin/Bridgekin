json.saved_opportunity do
  json.partial! 'api/saved_opportunities/saved_opportunity',
  saved_opportunity: @saved_opportunity
end

json.opportunity do
  json.partial! 'api/opportunities/opportunity',
  opportunity: @opportunity
end

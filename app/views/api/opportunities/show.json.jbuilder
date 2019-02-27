json.opportunity do
  json.partial! 'api/opportunities/opportunity',
  opportunity: @opportunity

  # json.networks @networks
end

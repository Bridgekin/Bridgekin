json.connected_opportunities do
  @connected_opportunities.each do |connected_opportunity|
    json.set! connected_opportunity.id do
      json.partial! 'api/opportunities/opportunity', opportunity: connected_opportunity
    end
  end
end

json.facilitated_connected_opportunities do
  @facilitated_connected_opportunities.each do |f_c_o|
    json.set! f_c_o.id do
      json.partial! 'api/opportunities/opportunity', opportunity: f_c_o
    end
  end
end

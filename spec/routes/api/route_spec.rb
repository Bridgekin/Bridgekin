require 'rails_helper'

describe 'Routes Spec', type: :routing do
  it "should route 'api/connected_opportunities', :to => 'api/connected_opportunities#create'" do
    expect(post: '/api/connected_opportunities').to route_to('api/connected_opportunities#create', format: :json)
  end
end

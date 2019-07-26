# require 'rails_helper'
# require "jwt_service"
# # require 'ruby-debug'
# require 'byebug'

# # RSpec.configure do |config|
# #   config.render_views = true
# # end

# RSpec.describe Api::ConnectedOpportunitiesController, type: :controller do
#   # _routes { Api::ConnectedOpportunitiesController.routes }

#   render_views
#   # let(:json) { JSON.parse(response.body) }

#   before :each do
#     @user = create(:user, :with_opportunities)
#     @user2 = create(:user, :with_opportunities)

#     payload = {
#       "sub": @user.id,
#       "exp": 14.days.from_now.to_i
#     }
#     @token = JwtService.encode(payload)
#   end

#   describe "POST Index" do
#     before do
#       request.headers['Authorization'] = @token
#     end

#     context "when connecting to an opportunity personally" do
#       it "does something" do
#         # byebug
#         post :create, params: {
#             use_route: 'api/connected_opportunities',
#             connected_opportunity:{
#               opportunity_id: @user2.opportunities.first.id,
#               connectBool: true,
#               permType: 'direct'
#             }
#           }, format: :json
#         expect(response.status).to eq(200)
#       end
#     end

#   end

# end

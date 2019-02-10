require 'rails_helper'
require "jwt_service"

RSpec.describe Api::OpportunitiesController, type: :controller do
  before do
    @user = User.create(confirmed_at: DateTime.now,
      email: '123@email.com', password: '12345678',
      password_confirmation: '12345678', fname:'sd', lname: 'sdf')

    @opportunity = Opportunity.create(owner_id: @user.id, title: 'a',
    opportunity_need: 'a', industries:['a'], geography: ['a'],
    value: 'a', status:'a')
    @network = Network.create(title: 'a')
    OpportunityNetwork.create(network_id: @network.id,
      opportunity_id: @opportunity.id )

    @opportunity_2 = Opportunity.create(owner_id: @user.id, title: 'a',
    opportunity_need: 'a', industries:['a'], geography: ['a'],
    value: 'a', status:'a')
    @network_2 = Network.create(title: 'b')
    OpportunityNetwork.create(network_id: @network_2.id,
      opportunity_id: @opportunity.id )

    payload = {
      "sub": @user.id,
      "exp": 14.days.from_now.to_i
    }
    @token = JwtService.encode(payload)
  end

  context "when signed in" do
    before do
      request.headers['Authorization'] = ''
      #using any action in opportunities
      get :index
    end

    it "should return error" do
      expect(response.status).to eq(401)
    end
  end

  describe "Get index" do
    context "when signed in" do
      before do
        request.headers['Authorization'] = @token
        get :index, format: :json
      end

      context "without specific network id" do
        it "returns @opportunities" do
          expect(assigns(:opportunities)).to eq([opportunity, opportunity_2])
        end

        it "renders the index template" do
          expect(response).to render_template("index")
        end

        it "has a 200 status code" do
          expect(response.status).to eq(200)
        end
      end

      context "with specific network id" do
        before do
          request.params = {network_id: network.id}
          get :index, format: :json
        end

        #How should we differntiate these two types of contexts?
        #Should we have 2 opportunities in 2 different networks so that
        #we get distinguishable results?

        it "returns @opportunities" do
          expect(assigns(:opportunities)).to eq([opportunity])
        end

        it "renders the index template" do
          expect(response).to render_template("index")
        end

        it "has a 200 status code" do
          expect(response.status).to eq(200)
        end
      end
    end
  end

  describe "Get userindex" do
    context "when signed in" do
      before do
        request.headers['Authorization'] = @token
        get :index, format: :json
      end

      it "returns @opportunities" do
        expect(assigns(:opportunities)).to eq([opportunity, opportunity_2])
      end

      it "renders the index template" do
        expect(response).to render_template("index")
      end

      it "has a 200 status code" do
        expect(response.status).to eq(200)
      end
    end
  end

  describe "Get show" do
    context "when signed in" do
      before do
        request.headers['Authorization'] = @token
        request.params = {id: opportunity.id}
        get :index, format: :json
      end

      it "returns @opportunity" do
        expect(assigns(:opportunity)).to eq(opportunity)
      end

      it "renders the show template" do
        expect(response).to render_template("show")
      end

      it "has a 200 status code" do
        expect(response.status).to eq(200)
      end
    end
  end

  describe "POST Create" do
    context "when signed in" do
      before do
        request.headers['Authorization'] = @token
        valid_params = {owner_id: @user.id, title: 'b',
        opportunity_need: 'b', industries:['b'], geography: ['b'],
        value: 'b', status:'b', networks: '#{@network_2.id}' }
      end

      context "with correct params" do
        before do
          request.params = valid_params
          get :index, format: :json
        end

        it "renders the show template" do
          expect(response).to render_template("show")
        end

        it "has a 200 status code" do
          expect(response.status).to eq(200)
        end

        it "should link new network" do
          expect(:opportunity.networks.first).to eq(@network_2)
        end

        it "should send mailer" do
          ??
        end
      end

      context "with incorrect params" do
        it "should return error without title" do
          valid_params[:title] = ''
          request.params = valid_params
          get :index, format: :json
          expect(response.status).to eq(422)
        end

        it "should return error without opportunity need" do
          valid_params[:opportunity_need] = ''
          request.params = valid_params
          get :index, format: :json
          expect(response.status).to eq(422)
        end

        it "should return error without industries" do
          valid_params[:industries] = []
          request.params = valid_params
          get :index, format: :json
          expect(response.status).to eq(422)
        end

        it "should return error without geographies" do
          valid_params[:geography] = []
          request.params = valid_params
          get :index, format: :json
          expect(response.status).to eq(422)
        end

        it "should return error without value" do
          valid_params[:value] = ''
          request.params = valid_params
          get :index, format: :json
          expect(response.status).to eq(422)
        end

        it "should return error without value" do
          valid_params[:value] = ''
          request.params = valid_params
          get :index, format: :json
          expect(response.status).to eq(422)
        end
      end
    end
  end

end

require 'test_helper'

class OpportunitiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @opportunity = opportunities(:one)
  end

  test "should get index" do
    get opportunities_url, as: :json
    assert_response :success
  end

  test "should create opportunity" do
    assert_difference('Opportunity.count') do
      post opportunities_url, params: { opportunity: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show opportunity" do
    get opportunity_url(@opportunity), as: :json
    assert_response :success
  end

  test "should update opportunity" do
    patch opportunity_url(@opportunity), params: { opportunity: {  } }, as: :json
    assert_response 200
  end

  test "should destroy opportunity" do
    assert_difference('Opportunity.count', -1) do
      delete opportunity_url(@opportunity), as: :json
    end

    assert_response 204
  end
end

class Api::ReferralLinksController < ApiController

  def create
    @link = ReferralLink.find_link_by_params(referral_params)

    if @link
      # code = api_referral_links_url + "/" + @link.referral_code
      # render json: { referral_code: code}, status: 200
      render :show
    else
      @link = ReferralLink.new(referral_params)

      if @link.save
        # url = api_referral_links_url + "/" + @link.referral_code
        # render json: { referral_code: url }, status: 200
        render :show
      else
        render json: @link.errors.full_messages, status: 422
      end
    end
  end

  def reveal
    @link = ReferralLink.find_by(referral_code: params[:referral_code])

    if @link
      render :show
    else
      ender json: { errors: ['invalid referral link'] }, status: :unprocessable_entity
    end
  end

  private

  def referral_params
    params.permit(:member_id, :network_id, :referral_code)
  end
end

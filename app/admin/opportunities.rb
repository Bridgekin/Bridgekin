ActiveAdmin.register Opportunity do
  permit_params :owner_id, :title, :opportunity_needs, :value,
    :status, industries: [], geography: []

  # index do
  #   id_column
  #   column :industries do |opportunity|
  #     "#{opportunity.industries.join( ", " ) unless opportunity.industries.nil?}"
  #   end
  #   actions
  # end
  #
  # show do |opportunity|
  #   attributes_table do
  #     row :industries do
  #       "#{opportunity.industries.join( ", " ) unless opportunity.industries.nil?}"
  #     end
  #   end
  # end

  # form do |f|
  #   f.inputs "Opportunity" do
  #     f.input :industries_raw, :as => :text
  #   end
  #   f.buttons
  # end
  #
  # before_save do |opportunity|
  #   opportunity.industries = params[:domain][:industries_raw].split(",") unless params[:opportunity].nil? or params[:opportunity][:industries].nil?
  # end
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end

# # require_relative '../helpers/active_admin_helper.rb'
# ActiveAdmin.register Opportunity do
#   permit_params :owner_id, :title, :opportunity_need, :value, :description,
#     :status, :deal_status, :anonymous, :view_type, :created_at, :updated_at,
#     industries: [], geography: []

#   index do
#     id_column
#     column :owner_id
#     column :title
#     column :description
#     column :opportunity_need
#     column :value
#     column :status
#     column :industries
#     column :geography
#     column :created_at
#     column :updated_at
#     column :deal_status
#     column :anonymous
#     column :view_type
#     actions
#   end

#   show do |opportunity|
#     attributes_table do
#       row :owner_id
#       row :title
#       row :description
#       row :opportunity_need
#       row :value
#       row :status
#       row :industries
#       row :geography
#       row :created_at
#       row :updated_at
#       row :deal_status
#       row :anonymous
#       row :view_type
#       #   "#{opportunity.industries.join( ", " ) unless opportunity.industries.nil?}"
#       # end
#     end

#     active_admin_comments
#   end

#   form do |f|
#     f.inputs "Opportunity" do
#       f.input :owner_id
#       f.input :title
#       f.input :description, :as => :text
#       f.input :opportunity_need, as: :select, collection: needs_choices
#       f.input :value, as: :select, collection: value_choices
#       f.input :status, as: :select, collection: ['Approved','Pending', 'Rejected']
#       f.input :industries_raw, :as => :string
#       f.input :geography_raw, :as => :string
#       f.input :deal_status,  as: :select, collection: ['Active','Pending', 'Closed', 'Deleted']
#       f.input :anonymous, :as => :boolean
#       f.input :view_type,  as: :select, collection: ['post','card']
#     end
#     f.actions
#   end

#   before_save do |opportunity|
#     opportunity.industries = params[:opportunity][:industries_raw].split(",") unless params[:opportunity].nil?
#     opportunity.geography = params[:opportunity][:geography_raw].split(",") unless params[:opportunity].nil?
#   end
# # See permitted parameters documentation:
# # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
# #
# # permit_params :list, :of, :attributes, :on, :model
# #
# # or
# #
# # permit_params do
# #   permitted = [:permitted, :attributes]
# #   permitted << :other if params[:action] == 'create' && current_user.admin?
# #   permitted
# # end

# end

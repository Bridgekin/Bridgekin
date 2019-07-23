# ActiveAdmin.register ConnectedOpportunity do
#   permit_params :opportunity_id, :user_id, :facilitator_id, :network_id,
#     :created_at, :updated_at

#   index do
#     id_column
#     column :opportunity_id
#     column :user_id
#     column :facilitator_id
#     column :network_id
#     column :created_at
#     column :updated_at
#     actions
#   end

#   show do |connected_opportunity|
#     attributes_table do
#       row :opportunity_id
#       row :user_id
#       row :facilitator_id
#       row :network_id
#       row :created_at
#       row :updated_at
#     end

#     active_admin_comments
#   end

#   form do |f|
#     f.inputs "Connected Opportunity" do
#       f.input :opportunity_id
#       f.input :user_id
#       f.input :facilitator_id
#       f.input :network_id
#       f.input :created_at
#       f.input :updated_at
#     end
#     f.actions
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

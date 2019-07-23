# ActiveAdmin.register UserNetwork do
#   permit_params :network_id, :member_id, :created_at, :updated_at

#   index do
#     id_column
#     column :network_id
#     column :member_id
#     column :created_at
#     column :updated_at
#     actions
#   end

#   show do |user_network|
#     attributes_table do
#       row :network_id
#       row :member_id
#       row :created_at
#       row :updated_at
#     end

#     active_admin_comments
#   end

#   form do |f|
#     f.inputs "User Network" do
#       f.input :network_id
#       f.input :member_id
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

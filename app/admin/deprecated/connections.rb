# ActiveAdmin.register Connection do
#   permit_params :user_id, :friend_id, :status, :created_at, :updated_at

#   index do
#     id_column
#     column :user_id
#     column :friend_id
#     column :status
#     column :created_at
#     column :updated_at
#     actions
#   end

#   show do |connection|
#     attributes_table do
#       row :user_id
#       row :friend_id
#       row :status
#       row :created_at
#       row :updated_at
#       #   "#{opportunity.industries.join( ", " ) unless opportunity.industries.nil?}"
#       # end
#     end

#     active_admin_comments
#   end

#   form do |f|
#     f.inputs "Connection" do
#       f.input :user_id
#       f.input :friend_id
#       f.input :status, as: :select, collection: ['Accepted','Pending']
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


# # index do
# #   id_column
# #   column :name
# #   column :network_id
# #   column :test_feature
# #   column :base1
# #   column :base2
# #   column :base3
# #   column :base4
# #   column :base5
# #   column :font1
# #   column :font2
# #   column :button1
# #   column :button2
# #   column :border1
# #   column :border2
# #   actions
# # end
# #
# # show do |opportunity|
# #   attributes_table do
# #     row :name
# #     row :network_id
# #     row :test_feature
# #     row :base1
# #     row :base2
# #     row :base3
# #     row :base4
# #     row :base5
# #     row :font1
# #     row :font2
# #     row :button1
# #     row :button2
# #     row :border1
# #     row :border2
# #   end
# #
# #   active_admin_comments
# # end
# #
# # form do |f|
# #   f.inputs "Opportunity" do
# #     f.input :name
# #     f.input :network_id
# #     f.input :test_feature
# #     f.input :base1, :as => :string
# #     f.input :base2
# #     f.input :base3
# #     f.input :base4
# #     f.input :base5
# #     f.input :font1
# #     f.input :font2
# #     f.input :button1
# #     f.input :button2
# #     f.input :border1
# #     f.input :border2
# #   end
# #   f.actions
# # end

ActiveAdmin.register SiteTemplate do
  permit_params :name, :network_id, :test_feature, :base1, :base2,
  :base3, :base4, :base5, :font1, :font2, :button1, :button2, :border1,
  :border2, :created_at, :updated_at

  # index do
  #   id_column
  #   column :name
  #   column :network_id
  #   column :test_feature
  #   column :base1
  #   column :base2
  #   column :base3
  #   column :base4
  #   column :base5
  #   column :font1
  #   column :font2
  #   column :button1
  #   column :button2
  #   column :border1
  #   column :border2
  #   actions
  # end
  #
  # show do |opportunity|
  #   attributes_table do
  #     row :name
  #     row :network_id
  #     row :test_feature
  #     row :base1
  #     row :base2
  #     row :base3
  #     row :base4
  #     row :base5
  #     row :font1
  #     row :font2
  #     row :button1
  #     row :button2
  #     row :border1
  #     row :border2
  #   end
  #
  #   active_admin_comments
  # end
  #
  # form do |f|
  #   f.inputs "Opportunity" do
  #     f.input :name
  #     f.input :network_id
  #     f.input :test_feature
  #     f.input :base1, :as => :string
  #     f.input :base2
  #     f.input :base3
  #     f.input :base4
  #     f.input :base5
  #     f.input :font1
  #     f.input :font2
  #     f.input :button1
  #     f.input :button2
  #     f.input :border1
  #     f.input :border2
  #   end
  #   f.actions
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

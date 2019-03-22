ActiveAdmin.register Circle do
  permit_params :title, :owner_id, :created_at, :updated_at

  index do
    id_column
    column :title
    column :owner_id
    column :created_at
    column :updated_at
    actions
  end

  show do |circle|
    attributes_table do
      row :title
      row :owner_id
      row :created_at
      row :updated_at
      #   "#{opportunity.industries.join( ", " ) unless opportunity.industries.nil?}"
      # end
    end

    active_admin_comments
  end

  form do |f|
    f.inputs "Circle" do
      f.input :title
      f.input :owner_id
      f.input :created_at
      f.input :updated_at
    end
    f.actions
  end
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

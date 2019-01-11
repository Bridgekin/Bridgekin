ActiveAdmin.register User do
  permit_params :email, :phone, :city, :state, :country, :is_admin,
    :membership_type, :fname, :lname, :title, :company, :created_at,
    :updated_at

  index do
    id_column
    column :email
    column :fname
    column :lname
    column :title
    column :company
    column :is_admin
    column :membership_type
    column :city
    column :state
    column :country
    column :phone
    column :created_at
    column :updated_at
    actions
  end

  show do |user|
    attributes_table do
      row :email
      row :fname
      row :lname
      row :title
      row :company
      row :is_admin
      row :membership_type
      row :city
      row :state
      row :country
      row :phone
      row :created_at
      row :updated_at
    end

    active_admin_comments
  end

  form do |f|
    f.inputs "User" do
      f.input :email
      f.input :fname
      f.input :lname
      f.input :title
      f.input :company
      f.input :is_admin
      f.input :membership_type, as: :select, collection: ['full','limited']
      f.input :city
      f.input :state
      f.input :country, :as => :string
      f.input :phone
      f.input :created_at
      f.input :updated_at
    end
    f.actions
  end
end

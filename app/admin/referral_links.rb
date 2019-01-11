ActiveAdmin.register ReferralLink do
  permit_params :referral_code, :member_id, :network_id,
  :created_at, :updated_at

  index do
    id_column
    column :referral_code
    column :member_id
    column :network_id
    column :created_at
    column :updated_at
    actions
  end

  show do |referral_link|
    attributes_table do
      row :referral_code
      row :member_id
      row :network_id
      row :created_at
      row :updated_at
    end

    active_admin_comments
  end

  form do |f|
    f.inputs "Referral Link" do
      f.input :referral_code
      f.input :member_id
      f.input :network_id
      f.input :created_at
      f.input :updated_at
    end
    f.actions
  end

end

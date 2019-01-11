ActiveAdmin.register WaitlistUser do
  permit_params :email, :fname, :lname, :email_sent_at,
  :from_referral_id, :created_at, :updated_at

  index do
    id_column
    column :email
    column :fname
    column :lname
    column :email_sent_at
    column :from_referral_id
    column :created_at
    column :updated_at
    actions
  end

  show do |waitlist_user|
    attributes_table do
      row :email
      row :fname
      row :lname
      row :email_sent_at
      row :from_referral_id
      row :created_at
      row :updated_at
    end

    active_admin_comments
  end

  form do |f|
    f.inputs "Waitlist User" do
      f.input :email
      f.input :fname
      f.input :lname
      f.input :email_sent_at
      f.input :from_referral_id
      f.input :created_at
      f.input :updated_at
    end
    f.actions
  end
end

json.extract! user, :id, :fname, :lname,
:confirmed_at, :is_admin, :title, :company, :email, :city,
:state, :country, :last_sign_in_at, :default_network_id,
:invites_remaining, :searchable, :linked_in_url

json.profilePicUrl url_for(user.profile_pic) if user.profile_pic.attached?

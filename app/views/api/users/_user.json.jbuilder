json.extract! user, :id, :fname, :lname,
:confirmed_at, :is_admin, :title, :company, :email, :city,
:state, :country

json.profilePicUrl url_for(user.profile_pic) if user.profile_pic.attached?

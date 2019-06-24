json.extract! sales_contact, :id, :email, :fname, :lname, :company, :position, :linked_in, :google, :facebook,
:facebook_url, :linkedin_url, :twitter_handle, :location

json.avatarUrl url_for(sales_contact.avatar) if sales_contact.avatar.attached?
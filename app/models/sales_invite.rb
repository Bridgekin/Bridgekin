class SalesInvite < ApplicationRecord
  validates :link_code, presence: :true
  validates :link_code, uniqueness: true

  after_initialize :ensure_link_code

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :SalesNetwork,
    optional: true

  belongs_to :sender,
    foreign_key: :sender_id,
    class_name: :User

  belongs_to :recipient,
    foreign_key: :recipient_id,
    class_name: :User,
    optional: true

  belongs_to :user_permission,
    foreign_key: :user_permission_id,
    class_name: :SalesUserPermission,
    optional: true

  def self.prep_batch_create(new_invites = nil, sender = nil, current_dashboard_target = nil)
    return nil if [new_invites, sender].any?{|val| val.nil?}
    new_user_invites = []
    existing_user_invites = []

    new_invites.each do |invite|
      invite.delete("id")
      if current_dashboard_target[:permissable_type] == "SalesNetwork"
        prepped_invite = invite.merge({
          network_id: current_dashboard_target[:permissable_id], 
          sender_id: sender.id
        })
      else
        prepped_invite = invite.merge({ sender_id: sender.id })
      end
      
      #Check if that user already exists
      user = User.find_by(email: invite[:email])
      if user
        existing_user_invites << prepped_invite.merge({ recipient_id: user.id})
      else
        new_user_invites << prepped_invite
      end
    end

    return new_user_invites + existing_user_invites
  end

  def self.save_batch(prepped_invites = nil, current_user = nil)
    raise "Invites or user not provided" if prepped_invites.nil? || current_user.nil?

    ActiveRecord::Base.transaction do
      @saved_invites = SalesInvite.create!(prepped_invites)

      @saved_invites.each do |invite|
        if invite[:network_id]
          SalesMailer.send_network_invite_email(invite, current_user).deliver_later
        else
          SalesMailer.send_user_invite_email(invite, current_user).deliver_later
        end
      end
    end
    
    @saved_invites
  rescue => e
    e.message
  end

  def self.confirm_invite(sales_invite = nil)
    raise if sales_invite.nil?
    sales_user_permission = sales_invite.user_permission
    ActiveRecord::Base.transaction do
      if sales_user_permission.nil?
        permissable = sales_invite.network || sales_invite.sender
        relationship = sales_invite.relationship
        recipient = sales_invite.recipient

        sales_user_permission = SalesUserPermission.create!(user: recipient, permissable: permissable, relationship: relationship)
      end
      sales_invite.update!(user_permission: sales_user_permission, status: "confirmed")
      sales_user_permission.update!(status: "confirmed", last_confirmed: DateTime.now)
    end
    true
  end

  def self.update_invite(sales_invite = nil, new_rel = nil, current_user = nil)
    raise if sales_invite.nil? || current_user.nil? || new_rel.nil?
    #using includes in the controller, so this user_permission call isn't actually being made twice
    sales_user_permission = sales_invite.user_permission
    old_rel = sales_invite.relationship
    ActiveRecord::Base.transaction do
      sales_invite.update!(relationship: new_rel)
      #Change permission to pending
      sales_user_permission.update!(status: "pending")
      #Notify user of change about to occur
      SalesMailer.confirm_permission_update_email(sales_invite, old_rel, new_rel, current_user).deliver_later
    end
    sales_invite 
  end

  def self.confirm_invite_update(sales_invite = nil, new_rel = nil)
    raise if sales_invite.nil?
    sales_user_permission = sales_invite.user_permission
    ActiveRecord::Base.transaction do
      sales_invite.update!(status: "confirmed")
      sales_user_permission.update!(relationship: new_rel, status: "confirmed")
    end
    sales_invite
  end

  def self.delete_invite(sales_invite = nil)
    raise if sales_invite.nil?
    ActiveRecord::Base.transaction do
      sales_user_permission = sales_invite.user_permission
      sales_invite.destroy!
      sales_user_permission.destroy! if sales_user_permission
    end
    true
  end

  def ensure_link_code
    self.link_code ||= generate_link_code
  end

  def generate_link_code
    SecureRandom.urlsafe_base64
  end
end
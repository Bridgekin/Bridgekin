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
        prepped_invite << invite.merge({
          network_id: current_dashboard_target[:permissable_id], 
          sender_id: sender.id
        })
      else
        prepped_invite << invite.merge({ sender_id: sender.id })
      end
      
      #Check if that user already exists
      user = User.find_by(email: invite[:email])
      if user
        existing_user_invites << prepped_invite.merge({ recipient_id: user.id})
      else
        new_user_invites << prepped_invite
      end
    end

    new_user_invites, existing_user_invites
  end

  def ensure_link_code
    self.link_code ||= generate_link_code
  end

  def generate_link_code
    SecureRandom.urlsafe_base64
  end
end
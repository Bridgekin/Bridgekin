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
    new_invites.map do |invite|
      if current_dashboard_target[:permissable_type] == "SalesNetwork"
        network_id = current_dashboard_target[:permissable_id]
        invite.merge({
          network_id: network_id, 
          sender_id: sender.id
        })
      else
        invite.merge({ sender_id: sender.id })
      end
    end
  end

  def ensure_link_code
    self.link_code ||= generate_link_code
  end

  def generate_link_code
    SecureRandom.urlsafe_base64
  end
end
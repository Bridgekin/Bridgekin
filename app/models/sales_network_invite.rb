class SalesNetworkInvite < ApplicationRecord
  validates :link_code, :network_id, presence: :true
  validates :link_code, uniqueness: true

  after_initialize :ensure_link_code

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :SalesNetwork

  belongs_to :sender,
    foreign_key: :sender_id,
    class_name: :User

  belongs_to :recipient,
    foreign_key: :recipient_id,
    class_name: :User,
    optional: true

  belongs_to :inviteable, 
    polymorphic: true,
    optional: true

  def self.prep_batch_create(new_invites = nil, sender_id = nil, network_id = nil)
    return nil if [new_invites, sender_id, network_id].any?{|val| val.nil?}

    new_invites.map do |invite|
      invite.merge({
        network_id: network_id, 
        sender_id: sender_id
      })
    end
  end

  def ensure_link_code
    self.link_code ||= generate_link_code
  end

  def generate_link_code
    SecureRandom.urlsafe_base64
  end
end
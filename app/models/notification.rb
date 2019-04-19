class Notification < ApplicationRecord
  validates :recipient_id, :actor_id, :action, presence: true

  after_initialize :set_notification_message

  belongs_to :recipient,
    foreign_key: :recipient_id,
    class_name: :User

  belongs_to :actor,
    foreign_key: :actor_id,
    class_name: :User

  belongs_to :origin, polymorphic: true

  belongs_to :acted_with, polymorphic: true

  belongs_to :targetable, polymorphic: true,
    optional: true


  #Actions: posted, shared, invited, sent, acknowledged

  def set_notification_message
    case self.acted_with_type
    when "Opportunity"
      if self.anonymous
        self.message = "An opportunity has been posted"
      elsif self.targetable_type == 'Network'
        self.message = "#{self.actor.fname.capitalize} #{self.action} an opportunity"
        #within #{self.targetable.title.capitalize}"
      elsif self.action == 'acknowledged'
        self.message = "#{self.actor.fname.capitalize} has #{self.action} your opportunity"
      elsif self.action == 'sent'
        self.message= "#{self.actor.fname.capitalize} #{self.action} you an opportunity"
        self.message += " directly" if self.action == 'sent'
      else
        self.message= "#{self.actor.fname.capitalize} #{self.action} an opportunity"
      end
    when "Connection"
      self.message = "#{self.actor.fname.capitalize} has #{self.action} you to connect"
    else
    end
  end

  # def self.retrieve_notifications(user)
  #   notifications = user.notifications
  #     .includes(:recipient, :actor, :acted_with, :targetable)
  #     .where(read_at: nil)
  #
  #   notifications.reduce([]) do |acc, notification|
  #     result = { id: notification.id }
  #     result['string'] = format_notification(notification)
  #     acc << result
  #   end
  # end
  #
  # def self.format_notification(notification)
  #   actor = notification.actor
  #   # debugger
  #   case notification.acted_with_type
  #   when "Opportunity"
  #     if notification.targetable_type == 'Network'
  #       targetable = notification.targetable
  #       msg = "#{actor.fname.capitalize} #{notification.action} an opp in #{targetable.title.capitalize}"
  #       msg
  #     elsif notification.action == 'acknowledged'
  #       msg = "#{actor.fname.capitalize} has #{notification.action} your opportunity"
  #       msg
  #     # elsif
  #     #   msg = "#{actor.fname.capitalize} {notification.action} you an opportunity"
  #     #   msg += " directly" if notification.action == 'sent'
  #     else
  #       msg = "#{actor.fname.capitalize} has #{notification.action} an opportunity"
  #       msg += " directly" if notification.action == 'sent'
  #       msg
  #     end
  #   when "Connection"
  #     msg = "#{actor.fname.capitalize} has #{notification.action} you to connect"
  #   else
  #     ''
  #   end
  # end
end

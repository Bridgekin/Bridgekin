class Notification < ApplicationRecord
  validates :recipient_id, :actor_id, :action, presence: true

  belongs_to :recipient,
    foreign_key: :recipient_id,
    class_name: :User

  belongs_to :actor,
    foreign_key: :actor_id,
    class_name: :User

  belongs_to :acted_with, polymorphic: true

  belongs_to :targetable, polymorphic: true,
    optional: true

  #Actions: posted, shared, invited, sent, acknowledged

  def retrieve_notifications(user)
    notifications = user.notifications
      .includes(:recipient, :actor, :acted_with, :targetable)
      .where(read_at: nil)
    notifications.reduce([]) do |notification|
      result = { id: notification.id }
      result['string'] = format_notification(notification)
    end
  end

  def format_notification(notification)
    actor = notification.actor

    case notification.acted_with_type
    when "Opportunity"
      if notification.targetable_type == 'Network'
        targetable = notification.targetable
        msg = "#{actor.fname.capitalize} {notification.action} an opp in #{targetable.title.capitalize}"
      elsif notification.action == 'acknowledged'
        msg = "#{actor.fname.capitalize} has {notification.action} your opportunity"
      elsif
        msg = "#{actor.fname.capitalize} {notification.action} you an opportunity"
        msg += " directly" if notification.action == 'sent'
      else
        msg = "#{actor.fname.capitalize} has {notification.action} an opportunity"
      end
    when "Connection"
      msg = "#{actor.fname.capitalize} has {notification.action} you to connect"
    else
      ''
    end
  end
end

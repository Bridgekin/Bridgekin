json.notifications do
  @notifications.each do |notification|
    json.set! notification.id do
      json.partial! 'api/notifications/notification', notification: notification
    end
  end
end

json.users do
  @notifications.each do |notification|
    json.set! notification.actor.id do
      json.partial! 'api/users/user', user: notification.actor
    end
  end
end

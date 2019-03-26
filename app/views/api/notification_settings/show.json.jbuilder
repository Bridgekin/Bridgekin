json.notification_setting do |json|
  json.partial! 'api/notification_settings/notification_setting',
  notification_setting: @notification_setting
end

desc "This task is called by the Heroku scheduler add-on"
namespace :heroku_scheduler do
  task :send_weekly_emails => :environment do
    #check day
    if True || Time.now.wday == 2
      users = User.where(id: EmailNotification.where(notification_setting: 'Weekly').pluck(:user_id))

      puts "Sending Weekly Email to users"
      users.each {|user| user.send_weekly_email }
    end
  end
end

# task :send_reminders => :environment do
#   User.send_reminders
# end

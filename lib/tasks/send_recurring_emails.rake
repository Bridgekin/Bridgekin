namespace :recurring_emails do
  desc "Opps to Contacts Summary - Send daily, weekly, or monthly emails"
  task opps_contacts_summary: :environment do
    #Find all notifiable users
    email_notifiable_users = User.includes(:notification_setting)
      .joins("LEFT JOIN notification_settings on notification_settings.user_id = users.id")
      .where.not(notification_settings: { email_recap_shared_contacts: 'Never'})
      .or(User.includes(:notification_setting)
        .joins("LEFT JOIN notification_settings on notification_settings.user_id = users.id")
        .where(notification_settings: { email_recap_shared_contacts: nil}))

    #Find all the email logs for 1) these users on 2) this topic
    related_email_logs = EmailLog.where(recipient_id: email_notifiable_users)
      .where(email_type: 'opps_from_contacts_summary')

    # debugger
    #Iterate through all notifiable users
    email_notifiable_users.each do |user|
      setting = user.notification_setting
      connections = user.connections.where(status: 'Accepted')
      prev_email_sent = related_email_logs.where(recipient_id: user)
        .order(created_at: :desc).first || nil

      #Determine Days since last email was sent
      if prev_email_sent.nil?
        days_since_last_email = nil
      else
        days_since_last_email = (DateTime.now.to_date -
          prev_email_sent.created_at.to_date).to_i
      end

      #Collect what was share to connections
      opp_perms = OppPermission.includes(:opportunity)
        .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
        .where(shareable_id: connections.pluck(:id),
          shareable_type: "Connection",
          opportunities: {status: 'Approved'})
        .where.not(
          opportunities: {deal_status: 'Deleted'},
          opportunities: {id: user.opportunities}
        )

      # debugger
      #Determine if email should be sent
      if setting.nil? || setting.email_recap_shared_contacts === 'Weekly'
        if days_since_last_email.nil? || days_since_last_email >= 7
          #Count how many notifications should be flagged
          opps = opp_perms.where("opp_permissions.created_at >= ?", (DateTime.now - 7))
            .pluck(:opportunity_id).uniq
          #Send email
          NotificationMailer.opps_from_contacts_summary(user.id, opps.length, 'Weekly')
            .deliver_now if opps.length > 0
        end

      elsif setting.email_recap_shared_contacts === 'Daily'
        if days_since_last_email.nil? || days_since_last_email >= 1
          #Count how many notifications should be flagged
          opps = opp_perms.where("opp_permissions.created_at >= ?", (DateTime.now - 1))
            .pluck(:opportunity_id).uniq
          #Send email
          NotificationMailer.opps_from_contacts_summary(user.id, opps.length, 'Daily')
            .deliver_now if opps.length > 0
        end

      elsif setting.email_recap_shared_contacts === 'Monthly'
        if days_since_last_email.nil? || days_since_last_email >= 28
          #Count how many notifications should be flagged
          opps = opp_perms.where("opp_permissions.created_at >= ?", (DateTime.now - 28))
            .pluck(:opportunity_id).uniq
          #Send email
          NotificationMailer.opps_from_contacts_summary(user.id, opps.length, 'Monthly')
            .deliver_now if opps.length > 0
        end
      end
    end

  end


  desc "Opps to Communities Summary - Send daily, weekly, or monthly emails"
  task opps_communities_summary: :environment do
    #Find all notifiable users
    email_notifiable_users = User.includes(:notification_setting)
      .joins("LEFT JOIN notification_settings on notification_settings.user_id = users.id")
      .where.not(notification_settings: { email_recap_shared_communities: 'Never'})
      .or(User.includes(:notification_setting)
        .joins("LEFT JOIN notification_settings on notification_settings.user_id = users.id")
        .where(notification_settings: { email_recap_shared_communities: nil}))

    #Find all the email logs for 1) these users on 2) this topic
    related_email_logs = EmailLog.where(recipient_id: email_notifiable_users)
      .where(email_type: 'opps_within_Bridgekin_summary')

    #Iterate through all notifiable users
    email_notifiable_users.each do |user|
      setting = user.notification_setting
      networks = user.member_networks
      prev_email_sent = related_email_logs.where(recipient_id: user)
        .order(created_at: :desc).first || nil

      #Determine Days since last email was sent
      if prev_email_sent.nil?
        days_since_last_email = nil
      else
        days_since_last_email = (DateTime.now.to_date -
          prev_email_sent.created_at.to_date).to_i
      end

      #Collect what was share to connections
      opp_perms = OppPermission.includes(:opportunity)
        .joins("INNER JOIN opportunities on opp_permissions.opportunity_id = opportunities.id")
        .where(shareable_id: networks.pluck(:id),
          shareable_type: "Network",
          opportunities: {status: 'Approved'})
        .where.not(
          opportunities: {deal_status: 'Deleted'},
          opportunities: {id: user.opportunities}
        )

      #Days_from_mapping = { 'Daily' => 1, 'Weekly' => 7, 'Monthly' => 28 }
      # debugger
      #Determine if email should bsent
      if setting.nil? || setting.email_recap_shared_communities === 'Weekly'
        if days_since_last_email.nil? || days_since_last_email >= 7
          #Count how many notifications should be flagged
          opps = opp_perms.where("opp_permissions.created_at >= ?", (DateTime.now - 7))
            .pluck(:opportunity_id).uniq
          #Send email
          NotificationMailer.opps_within_Bridgekin_summary(user.id, opps.length, 'Weekly')
            .deliver_now if opps.length > 0
        end

      elsif setting.email_recap_shared_communities === 'Daily'
        if days_since_last_email.nil? || days_since_last_email >= 1
          #Count how many notifications should be flagged
          opps = opp_perms.where("opp_permissions.created_at >= ?", (DateTime.now - 1))
            .pluck(:opportunity_id).uniq
          #Send email
          NotificationMailer.opps_within_Bridgekin_summary(user.id, opps.length, 'Daily')
            .deliver_now if opps.length > 0
        end

      elsif setting.email_recap_shared_communities === 'Monthly'
        if days_since_last_email.nil? || days_since_last_email >= 28
          #Count how many notifications should be flagged
          opps = opp_perms.where("opp_permissions.created_at >= ?", (DateTime.now - 28))
            .pluck(:opportunity_id).uniq
          #Send email
          NotificationMailer.opps_within_Bridgekin_summary(user.id, opps.length, 'Monthly')
            .deliver_now if opps.length > 0
        end
      end
    end

  end
end

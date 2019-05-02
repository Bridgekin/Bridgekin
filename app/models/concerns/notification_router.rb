module NotificationRouter
  def send_opportunity_notifications(opportunity, opp_permission_ids)
    sent_to_notifications = Set.new()
    sent_to_emails = Set.new()
    actorId = opportunity.owner_id
    permissions = OppPermission.includes(:shareable)
      .where(id: opp_permission_ids)

    # Actions: shared, sent
    permissions.where(shareable_type: "Connection").order(:mass)
      .each do |perm|
      connection = perm.shareable
      recipient_id = (connection.user_id == opportunity.owner_id) ?
        connection.friend_id : connection.user_id
      notification_setting = NotificationSetting.find_by(user_id: recipient_id)
      action = perm.mass ? "shared" : "sent"

      #Create Notification object if needed
      if (notification_setting.nil? ||
        (perm.mass ? notification_setting.opps_shared_contacts :
          notification_setting.opps_shared_direct)) &&
        !(sent_to_notifications.include?(recipient_id))
        Notification.create(
          recipient_id: recipient_id,
          actor_id: actorId,
          action: action,
          acted_with_type: 'Opportunity',
          acted_with_id: opportunity.id,
          origin_type: 'OppPermission',
          origin_id: perm.id,
          anonymous: opportunity.anonymous
        )

        sent_to_notifications.add(recipient_id)
      end

      unless sent_to_emails.include?(recipient_id)
        if notification_setting.nil? || (!perm.mass && notification_setting.email_opps_shared_direct)
          NotificationMailer.direct_opportunity_received(recipient_id, actorId, opportunity).deliver_later
          sent_to_emails.add(recipient_id)
        elsif notification_setting.nil? || (perm.mass && notification_setting.email_opps_shared_contacts)
          NotificationMailer.opportunity_from_contacts(recipient_id, actorId, opportunity).deliver_later
          sent_to_emails.add(recipient_id)
        end
      end
    end

    # Actions: posted
    permissions.where(shareable_type: "Network").each do |perm|
      network = perm.shareable
      notifiable_users = User.joins("LEFT JOIN notification_settings on notification_settings.user_id = users.id")
        .where(notification_settings: { opps_shared_communities: [true, nil]})
      email_notifiable_users = User.joins("LEFT JOIN notification_settings on notification_settings.user_id = users.id")
        .where(notification_settings: { email_opps_shared_communities: [true, nil]})
      members = network.members.where.not(users: { id: opportunity.owner_id})
      notifiable_members = members & notifiable_users

      notifiable_members.each do |member|
        unless sent_to_notifications.include?(member.id)
          Notification.create(
            recipient_id: member.id,
            actor_id: actorId,
            action: "posted",
            acted_with_type: 'Opportunity',
            acted_with_id: opportunity.id,
            targetable_type: 'Network',
            targetable_id: network.id,
            origin_type: 'OppPermission',
            origin_id: perm.id,
            anonymous: opportunity.anonymous
          )

          sent_to_notifications.add(member.id)
        end
      end

      # email_notifiable_members.each do |member|
      #   unless sent_to_emails.include?(member.id)
      #     NotificationMailer.direct_opportunity_received(recipient_id, actorId).deliver_now
      #     sent_to_emails.add(member.id)
      #   end
      # end
    end
  end

  def send_connection_notification(connection, actor, recipient)
    notification_setting = NotificationSetting.find_by(user_id: recipient.id)

    if notification_setting.nil? || notification_setting.invites_requested
      Notification.create(
        recipient_id: recipient.id,
        actor_id: actor.id,
        action: "invited",
        acted_with_type: 'Connection',
        acted_with_id: connection.id,
        origin_type: 'Connection',
        origin_id: connection.id
      )
    end

    if notification_setting.nil? || notification_setting.email_invites_requested
      NotificationMailer.invitation_request(recipient.id, actor.id).deliver_now
    end
  end

end

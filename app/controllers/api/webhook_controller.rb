class Api::WebhookController < ApiController
  def clearbit
    webhook = Clearbit::Webhook.new(request.env)
    # debugger

    # case webhook.type
    # when 'person'
    #   debugger
    #   person = Person.find(webhook.id)
    #   person.clearbit = webhook.body
    #   person.unknown  = webhook.status == 404
    #   person.save
    # end

    # if webhook.body.person

    head 200
  end
end

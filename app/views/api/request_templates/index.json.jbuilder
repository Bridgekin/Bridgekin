json.request_templates do
  @request_templates.each do |request_template|
    json.set! request_template.id do
      json.partial! 'api/request_templates/request_template', request_template: request_template
    end
  end
end
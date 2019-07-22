json.template do
  json.extract! @template, :id, :template_type, :subject, :body
end

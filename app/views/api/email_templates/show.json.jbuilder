json.template do
  json.extract! @template, :id, :type, :subject, :body
end

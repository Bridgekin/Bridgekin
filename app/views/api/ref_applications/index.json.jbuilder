json.ref_applications do
  @ref_applications.each do |ref_application|
    json.set! ref_application.id do
      json.partial! 'api/ref_applications/ref_application', ref_application: ref_application
    end
  end
end

json.submitted_applications @submitted_applications.pluck(:id)
json.owned_applications @owned_applications.pluck(:id)

# json.submitted_applications do
#   @submitted_applications.each do |submitted_application|
#     json.set! submitted_application.id do
#       json.partial! 'api/ref_applications/ref_application', ref_application: submitted_application
#     end
#   end
# end

# json.owned_applications do
#   @owned_applications.each do |owned_application|
#     json.set! owned_application.id do
#       json.partial! 'api/ref_applications/ref_application', ref_application: owned_application
#     end
#   end
# end
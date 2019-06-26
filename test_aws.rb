require 'pry'
require "aws-sdk-s3"
s3 = Aws::S3::Client.new(
    region: Rails.application.credentials[aws_env][:region], #or any other region
    access_key_id: Rails.application.credentials[aws_env][:access_key_id],
    secret_access_key: Rails.application.credentials[aws_env][:secret_access_key]
  )

file = File.open('filename', 'wb') do |file|
  resp = s3.get_object({bucket:Rails.application.credentials[aws_env][:bucket], key: "6cedbc62-a806-49c3-90ed-24906c3db75b-Connections.csv"}, target: file) 
end

binding.pry

parsedFile = CSV.parse(upload.read, headers: true)

binding.pry
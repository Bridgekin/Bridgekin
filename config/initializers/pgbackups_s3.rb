# PgbackupsS3.configure do |config|
#   # Databases that you want data to be pulled from and restored to.
#   # Defaults to 'DATABASE_URL'
#   # Example of other is 'HEROKU_POSTGRESQL_GRAY_URL'
#   # config.capture_database = 'DATABASE_URL'
#   # config.restore_database = 'DATABASE_URL'
#
#   # Change this to the S3 bucket name you want the backups to go into
#   # Defaults to 'pgbackups_s3'
#   config.bucket = 'bridgekin-staging'
#
#   # This specifies the directories the backups will go in within your bucket
#   # Ex. 'backups' will put all backups within your bucket in the backups folder
#   config.directories = 'backups'
#
#   # Input your amazon credentials
#   # Required
#   config.access_key_id = Rails.application.credentials.aws_staging[:access_key_id]
#   config.secret_access_key = Rails.application.credentials.aws_staging[:secret_access_key]
# end

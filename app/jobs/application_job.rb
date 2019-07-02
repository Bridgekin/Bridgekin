class ApplicationJob < ActiveJob::Base
  ActiveJob::TrafficControl.client = ConnectionPool.new(size: 5, timeout: 30) { Redis.new }
end

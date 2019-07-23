require 'rails_helper'

RSpec.describe EmailNotification, type: :model do
  subject { EmailNotification.new(user_id: 1, notification_setting: 'weekly') }

  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:notification_setting) }
  it { should validate_uniqueness_of(:user_id)}

  it { should belong_to(:user) }
end

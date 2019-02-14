require 'rails_helper'

RSpec.describe WaitlistUser, type: :model do
  describe "waitlist user" do
    subject { create(:waitlist_user) }

    it { should validate_presence_of(:fname) }
    # it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email)
      .case_insensitive
      .with_message("has already signed up for the waitlist") }

    it { should allow_value(subject.email).for(:email)}
    it { should_not allow_value('123').for(:email)}
    it { should_not allow_value('123@').for(:email)}
    it { should_not allow_value('@e').for(:email)}
  end
end

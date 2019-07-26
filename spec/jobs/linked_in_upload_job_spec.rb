require 'rails_helper'

RSpec.describe LinkedInUploadJob, type: :job do
  describe "linked_in_job" do
    before(:all) do
      @entry = {
        "First Name" => Faker::Name.first_name,
        "Last Name" => Faker::Name.last_name,
        "Company" => Faker::Company.name,
        "Position" => Faker::Company.profession
      }
      @user = create(:user)
    end

    subject(:job) { LinkedInUploadJob.new }

    it "should enqueue the job" do
      expect {
        LinkedInUploadJob.perform_later(@entry, @user)
      }.to have_enqueued_job
    end

    it "should save a contact" do
      job.perform(@entry, @user)
      contact = SalesContact.find_by(fname: @entry["First Name"], company: @entry["Company"])
      expect(contact).not_to be_nil
      expect(contact.id).not_to be_nil
    end

  end
end
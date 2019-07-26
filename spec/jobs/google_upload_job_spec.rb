require 'rails_helper'

RSpec.describe GoogleUploadJob, type: :job do
  describe "google_upload_job" do
    before(:all) do
      @entry = {
        "email" => Faker::Internet.unique.email,
        "name" => Faker::Name.name
      }
      @user = create(:user)
    end

    subject(:job) { GoogleUploadJob.new }

    it "should enqueue the job" do
      expect {
        GoogleUploadJob.perform_later(@entry, @user)
      }.to have_enqueued_job
    end

    it "should save a contact" do
      job.perform(@entry, @user)
      contact = SalesContact.find_by(email: @entry["email"])
      expect(contact).not_to be_nil
      expect(contact.id).not_to be_nil
    end

    it "should track a failed upload if no last name provided" do
      @entry["name"] = Faker::Name.first_name
      job.perform(@entry, @user)
      failed_upload = FailedUpload.find_by(uploader_id: @user.id, email: @entry["email"])
      expect(failed_upload).not_to be_nil
    end
  end
end
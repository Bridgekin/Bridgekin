require 'rails_helper'

RSpec.describe ConnectSocialJob, type: :job do
  describe "connect_social_job" do
    before(:all) do
      @payload = {
        "linked_in_key" => "5773acca-7a60-4926-9104-b8b6e335e615-Connections.csv",
        "google_key" => "e1cf8e60-9f46-48be-9e21-c9a3a6c912af-google_upload",
      }
      @user = create(:user)
    end

    subject(:job) { ConnectSocialJob.new }

    it "should enqueue the job" do
      expect {
        ConnectSocialJob.perform_later(@payload, @user)
      }.to have_enqueued_job
    end

    it "should track the import in a connect social stat" do
      job.perform(@payload, @user)
      find_stat = ConnectSocialStat.find_by(linked_in_key: @payload["linked_in_key"], google_key: @payload["google_key"])
      expect(find_stat).not_to be_nil
    end

    it "should notify_contacts_imported" do
      expect {
        ConnectSocialJob.perform_now(@payload, @user)
      }.to have_enqueued_job.on_queue('mailers')
      expect(enqueued_jobs.last[:args][0]).to eq("SalesMailer")
      expect(enqueued_jobs.last[:args][1]).to eq("notify_contacts_imported")
    end

    context "for google" do
      before(:all) do
        @payload = {
          "google_key" => "e1cf8e60-9f46-48be-9e21-c9a3a6c912af-google_upload"}
      end

      it "should call ingest google" do
        expect(job).to receive(:ingestGoogle)
        job.perform(@payload, @user)
      end

      it "should enqueue a new job" do
        expect {
          ConnectSocialJob.perform_now(@payload, @user)
        }.to have_enqueued_job(GoogleUploadJob).at_least(700)
      end
    end

    context "for linked in" do
      before(:all) do
        @payload = {
          "linked_in_key" => "5773acca-7a60-4926-9104-b8b6e335e615-Connections.csv"}
      end

      it "should call ingest google" do
        expect(job).to receive(:ingestLinkedIn)
        job.perform(@payload, @user)
      end

      it "should enqueue a new job" do
        expect {
          ConnectSocialJob.perform_now(@payload, @user)
        }.to have_enqueued_job(LinkedInUploadJob).at_least(1102)
      end
    end
  end
end

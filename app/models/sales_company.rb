class SalesCompany < ApplicationRecord
  validates :title, presence: true

  has_one_attached :logo

  # def grab_logo_image(url)
  #   downloaded_image = open(url)
  #   self.logo.attach(io: downloaded_image, filename: "cb_logo")
  # end

  def grab_logo_image(url)
    begin
      tempfile = Down.download(url)
      mimetext = MIME::Types[tempfile.content_type].first
      extension = mimetext.preferred_extension

      if extension.present?
        self.logo.attach(io: tempfile, filename: "cb_logo-#{self.id}.#{extension}")
      end
    rescue => exception
      logger.error "Couldn't find a picture for company: #{self.title} at url: #{url}"
    end
  end

end

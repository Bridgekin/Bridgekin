class SalesCompany < ApplicationRecord
  validates :title, presence: true

  has_one_attached :logo

  # def grab_logo_image(url)
  #   downloaded_image = open(url)
  #   self.logo.attach(io: downloaded_image, filename: "cb_logo")
  # end

  def self.build_sales_company(title)
    company = SalesCompany.find_or_initialize_by(title: title)
    return company unless company.id.nil?

    begin
      response = RestClient.get("https://autocomplete.clearbit.com/v1/companies/suggest?query=#{company.title}")
      parsed = JSON.parse(response.body)
      answer = parsed.reduce({}) do |acc, entry|
        acc = entry if entry["name"].downcase == company.title.downcase
        acc
      end
      if answer.present?
        company.domain = answer["domain"]
        company.logo_url = answer["logo"]
        company.grab_logo_image(answer["logo"]) if answer["logo"].present?
      end
      
      if company.save
        return company
      else
        logger.error "Failed to save company #{company.title} because of #{company.errors.full_messages.join(" ")}"
      end
    rescue => e
      logger.error "Error getting and saving company, detailed here: #{e.message}"
    end
    nil
  end

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

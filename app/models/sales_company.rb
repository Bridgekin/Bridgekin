class SalesCompany < ApplicationRecord
  validates :title, presence: true

  has_one_attached :logo

  def grab_logo_image(url)
    downloaded_image = open(url)
    self.logo.attach(io: downloaded_image, filename: "cb_logo")
  end
end

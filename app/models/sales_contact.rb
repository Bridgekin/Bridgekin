# require 'open-uri'
# require 'down'
# require 'mime/types'

class SalesContact < ApplicationRecord
  has_many :sales_user_contacts,
    foreign_key: :contact_id,
    class_name: :SalesUserContact,
    dependent: :destroy

  has_many :friends,
    through: :sales_user_contacts,
    source: :user

  has_many :sales_intros,
    foreign_key: :contact_id,
    class_name: :SalesIntro,
    dependent: :destroy

  has_one_attached :avatar

  def self.test_stripe
    Stripe.api_key = Rails.application.credentials.stripe[:test][:secret_key]

    charge = Stripe::Charge.create({
      amount: 999,
      currency: 'usd',
      source: 'tok_visa',
      receipt_email: 'jenny.rosen@example.com',
    })
    debugger

  end

  def setSource(source)
    case source
    when :linked_in_upload
      self.linked_in = true
    when :google_upload
      self.google = true
    when :facebook_upload
      self.facebook = true
    else 
    end
  end

  def grab_avatar_image(url)
    # downloaded_image = open(url)
    tempfile = Down.download(url)
    mimetext = MIME::Types[tempfile.content_type].first
    extension = mimetext.preferred_extension

    if extension.present?
      self.avatar.attach(io: tempfile, filename: "full_contact_avatar-#{self.id}.#{extension}")
    end
  end
end

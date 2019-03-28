class EmailTemplate < ApplicationRecord
  validates :template_type, :subject, :body, presence: true
  validates :template_type, uniqueness: true

end

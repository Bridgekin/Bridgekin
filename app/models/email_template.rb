class EmailTemplate < ApplicationRecord
  validates :type, :subject, :body, presence: true
  validates :type, uniqueness: true

end

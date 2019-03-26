class OppPermission < ApplicationRecord
  validates :opportunity_id, presence: true

  belongs_to :opportunity,
    foreign_key: :opportunity_id,
    class_name: :Opportunity

  belongs_to :shareable, polymorphic: true,
    optional: true

  has_many :notifications,
    as: :origin,
    dependent: :destroy
end

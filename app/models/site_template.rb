class SiteTemplate < ApplicationRecord
  validates :network_id, presence: true, uniqueness: true

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :Network

  has_one_attached :nav_logo

end

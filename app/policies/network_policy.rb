class NetworkPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      user.member_networks
    end
  end

  def create?
    record.admins.include?(user) || user.is_admin
  end

  def update?
    record.admins.include?(user) || user.is_admin
  end

  def destroy?
    record.admins.include?(user) || user.is_admin
  end
end

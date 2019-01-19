class ReferralLinkPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    record.owner == user || user.is_admin
  end

  def reveal
    true
  end
end

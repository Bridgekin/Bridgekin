class ReferralLinkPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    record.owner == user
  end

  def reveal
    true
  end
end

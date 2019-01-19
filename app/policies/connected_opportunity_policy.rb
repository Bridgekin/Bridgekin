class ConnectedOpportunityPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    record.user == user || record.facilitator == user || user.is_admin
  end

  def update?
    record.user == user || record.facilitator == user || user.is_admin
  end

  def destroy?
    record.user == user || record.facilitator == user || user.is_admin
  end
end

class SavedOpportunityPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user_id: user.id)
    end
  end

  def create?
    record.user == user || user.is_admin
  end

  def update?
    record.user == user || user.is_admin
  end

  def destroy?
    record.user == user || user.is_admin
  end

end

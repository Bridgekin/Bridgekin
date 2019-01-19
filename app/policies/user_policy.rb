class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    true
  end

  def update?
    record == user || user.is_admin
  end

  def destroy?
    record == user || user.is_admin
  end
end

class OpportunityPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      network_ids = user.member_networks.pluck(:id)
      scope.joins(:opportunity_networks)
        .where(opportunity_networks: { network_id: network_ids} )
    end
  end

  def show?
    true
  end

  def create?
    record.owner == user
  end

  def update?
    record.owner == user
  end

  def destroy?
    record.owner == user
  end
end

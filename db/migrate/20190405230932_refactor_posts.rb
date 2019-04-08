class RefactorPosts < ActiveRecord::Migration[5.2]
  def change
    opportunities = Opportunity.where(view_type: 'post')
      .where.not(description: nil)

    opportunities.each do |opp|
      if opp.title.empty?
        opp.title = opp.description
        opp.description = nil
        opp.save
      end
    end
    
  end
end

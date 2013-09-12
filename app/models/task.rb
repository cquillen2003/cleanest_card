class Task < ActiveRecord::Base
  attr_accessible :project_id, :title, :status, :order
  
  belongs_to :project
  
  def self.filter_by_status(status)
  	where("status = ?", status)
  end
  
  def self.stand_alone_tasks
  	where("project_id = ?", 0)
  end    
  
end

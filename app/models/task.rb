class Task < ActiveRecord::Base
  attr_accessible :project_id, :name, :description, :notes, :status, :order
  
  belongs_to :project
  
  def self.filter_by_status(status)
  	where("status = ?", status)
  end
  
  def self.stand_alone_tasks
  	where("project_id IS NULL")
  end    
  
end

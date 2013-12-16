class Task < ActiveRecord::Base
  attr_accessible :taskable_id, :taskable_type, :name, :description, :notes, :status, :order
  
  belongs_to :taskable, :polymorphic => true
  
  def self.filter_by_status(status)
  	where("status = ?", status)
  end
  
  #This method is deprecated with the polymorphic setup with taskable_id
  #def self.stand_alone_tasks
  	#where("project_id IS NULL")
  #end    
  
end

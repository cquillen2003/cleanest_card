class Project < ActiveRecord::Base
  attr_accessible :title, :notes, :status, :order, :due_date, :priority, :tasks_attributes
  
  has_many :tasks
  accepts_nested_attributes_for :tasks
  
  def self.filter_by_status(status)
  	where("status = ?", status)
  end  
  
end

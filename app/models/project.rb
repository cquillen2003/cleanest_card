class Project < ActiveRecord::Base
  attr_accessible :name, :description, :notes, :status, :order, :due_date, :priority, :tasks_attributes
  
  has_many :project_users
  has_many :users, :through => :project_users
  
  has_many :tasks, :as => :taskable
  accepts_nested_attributes_for :tasks
  
  def self.filter_by_status(status)
  	where("status = ?", status)
  end  
  
end

class Project < ActiveRecord::Base
  attr_accessible :name, :description, :notes, :status, :order, :due_date, :priority, :tasks_attributes
  
  has_many :project_users
  has_many :users, :through => :project_users
  
  has_many :tasks, :as => :taskable
  accepts_nested_attributes_for :tasks
  
  
  def self.plan_filter(user_id, category_id)
  	joins(:project_users => :category)
  	.where("user_id =?", user_id)
  	.where("categories.id = ?", category_id)
  end
  
  def self.filter_by_status(status)
  	where("status = ?", status)
  end  
  
end

class Project < ActiveRecord::Base
  attr_accessible :category_id, :name, :description, :notes, :status, :order, :due_date, :priority, :tasks_attributes
  
  has_many :assignments, :as => :assignable
  has_many :users, :through => :assignments
  
  has_many :tasks, :as => :taskable
  accepts_nested_attributes_for :tasks
  
  
  def self.plan_filter(user_id, category_id)
  	joins(:categories => :users)
  	.where("user_id =?", user_id)
  	.where("categories.id = ?", category_id)
  end
  
  def self.filter_by_status(status)
  	where("status = ?", status)
  end  
  
end

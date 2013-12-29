class Category < ActiveRecord::Base
  attr_accessible :name
  
  has_many :assignments, :as => :assignable
  has_many :users, :through => :assignments
  
  has_many :projects
  has_many :tasks, :as => :taskable
  
end

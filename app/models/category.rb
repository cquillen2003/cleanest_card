class Category < ActiveRecord::Base
  attr_accessible :name
  
  has_many :category_users
  has_many :users, :through => :category_users
  
  has_many :project_users
  
end

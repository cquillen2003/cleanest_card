class ProjectUser < ActiveRecord::Base
  attr_accessible :category_id, :project_id, :user_id
  
  belongs_to :project
  belongs_to :user
  
end

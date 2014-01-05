class Split < ActiveRecord::Base
  attr_accessible :project_id, :new_project_id

  belongs_to :project
end

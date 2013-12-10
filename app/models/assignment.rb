class Assignment < ActiveRecord::Base
  attr_accessible :assignable_id, :assignable_type, :user_id
  
  belongs_to :user
  
  belongs_to :assignable, :polymorphic => true
  
end

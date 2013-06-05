class Project < ActiveRecord::Base
  attr_accessible :title, :status, :order
  
  def self.filter_by_status(status)
  	where("status = ?", status)
  end  
  
end

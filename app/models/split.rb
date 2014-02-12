class Split < ActiveRecord::Base
  attr_accessible :item_id, :new_item_id

  belongs_to :item
end

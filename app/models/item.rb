class Item < ActiveRecord::Base
	attr_accessible :due_date, :linkable_id, :linkable_type, :name, :description, :notes, :order, :priority, :status, :user_id, :steps_attributes

	belongs_to :linkable, :polymorphic => true, :counter_cache => true

	has_many :steps, :as => :linkable, :class_name => "Item", :foreign_key => "linkable_id"

	accepts_nested_attributes_for :steps, :allow_destroy => true


	def self.backlog(user_id, category_id)
  	Item.find_by_sql(
      ["select distinct i1.id, i1.name
      from items i1
      inner join items i2 on i1.id = i2.linkable_id and i2.linkable_type = 'Item'
      left join assignments a on i1.id = a.assignable_id and a.assignable_type = 'Item' and a.user_id = ?
      where i2.status = 'backlog'
      and i1.id not in (
        select i1.id
        from items i1
        inner join items i2 on i1.id = i2.linkable_id and i2.linkable_type = 'Item'
        where i2.status in ('planned', 'started', 'done')
      )
      and i1.linkable_id in (?)
      and i1.linkable_type = 'Category'", user_id, category_id]
    )
	end  

end

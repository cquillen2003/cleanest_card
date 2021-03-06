class Item < ActiveRecord::Base
	attr_accessible :due_date, :linkable_id, :linkable_type, :name, :description,
                  :notes, :order, :priority, :status, :user_id, :item_type, :tasks_attributes

	belongs_to :linkable, :polymorphic => true, :counter_cache => true

	has_many :tasks, :as => :linkable, :class_name => "Item", :foreign_key => "linkable_id"
  has_many :splits

	accepts_nested_attributes_for :tasks, :allow_destroy => true

  after_save :update_parent


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

  def self.latest_split(item_id)
    Item.find_by_sql(
      ["select i.*
      from splits s
      inner join items i on s.new_item_id = i.id
      where s.item_id = ?
      and i.status in ('planned', 'started')
      order by s.created_at DESC
      limit 1", item_id]
    )
  end


  private

    def update_parent
      if self.linkable_type == "Item"
        #self.status = "cq"
        parent_item = Item.find(self.linkable_id)

        backlog_tasks = parent_item.tasks.where({ :status => "backlog" }).count
        planned_tasks = parent_item.tasks.where({ :status => "planned" }).count
        started_tasks = parent_item.tasks.where({ :status => "started" }).count
        done_tasks = parent_item.tasks.where({ :status => "done" }).count

        if (planned_tasks + started_tasks + done_tasks) == 0 && backlog_tasks > 0
          parent_item.update_attribute(:status, "backlog")
        elsif (backlog_tasks + started_tasks + done_tasks) == 0 && planned_tasks > 0
          parent_item.update_attribute(:status, "planned")
        elsif (started_tasks + done_tasks) > 0 && (planned_tasks + started_tasks) > 0
          parent_item.update_attribute(:status, "started")
        elsif (backlog_tasks + planned_tasks + started_tasks) == 0 && done_tasks > 0
          parent_item.update_attribute(:status, "done")
        else
          #TODO: log error
        end

      end
    end

end

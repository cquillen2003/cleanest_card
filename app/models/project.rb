class Project < ActiveRecord::Base
  attr_accessible :category_id, :name, :description, :notes, :order, :due_date, :priority, :tasks_attributes, :assignments_attributes
  
  has_many :assignments, :as => :assignable
  has_many :users, :through => :assignments
  
  has_many :tasks, :as => :taskable
  has_many :splits

  accepts_nested_attributes_for :tasks, :allow_destroy => true
  accepts_nested_attributes_for :assignments, :allow_destroy => true
  
  
  def self.plan_filter(user_id, category_id)
  	joins(:categories => :users)
  	.where("user_id =?", user_id)
  	.where("categories.id = ?", category_id)
  end  

  def self.backlog(user_id, category_id)
    Project.find_by_sql(
      ["select distinct p.id, p.name
      from projects p
      inner join tasks t on p.id = t.taskable_id and t.taskable_type = 'Project'
      left join assignments a on p.id = a.assignable_id and a.assignable_type = 'Project' and a.user_id = ?
      where t.status = 'backlog'
      and p.id not in (
        select p.id
        from projects p
        inner join tasks t on p.id = t.taskable_id and t.taskable_type = 'Project'
        where t.status in ('planned', 'started', 'done')
      )
      and p.category_id = ?", user_id, category_id]
    )
  end

  def self.planned(user_id, category_id)
    Project.find_by_sql(
      ["select distinct p.id, p.name
      from projects p
      inner join tasks t on p.id = t.taskable_id and t.taskable_type = 'Project'
      left join assignments a on p.id = a.assignable_id and a.assignable_type = 'Project' and a.user_id = ?
      where t.status = 'planned'
      and p.id not in (
        select p.id
        from projects p
        inner join tasks t on p.id = t.taskable_id
        where t.status in ('backlog', 'started', 'done')
      )
      and p.category_id = ?", user_id, category_id]
    )
  end
  
  def self.started(user_id, category_id)
    Project.find_by_sql(
      ["select distinct p.id, p.name
      from projects p
      inner join tasks t on p.id = t.taskable_id and t.taskable_type = 'Project'
      left join assignments a on p.id = a.assignable_id and a.assignable_type = 'Project' and a.user_id = ?
      where t.status in ('started', 'done') 
      and p.id not in (
        select p.id
        from projects p
        inner join tasks t on p.id = t.taskable_id and t.taskable_type = 'Project'
        where t.status not in ('backlog', 'planned', 'started')
      )
      and p.category_id = ?", user_id, category_id]
    )
  end  

  def self.done(user_id, category_id)
    Project.find_by_sql(
      ["select distinct p.id, p.name
      from projects p
      inner join tasks t on p.id = t.taskable_id and t.taskable_type = 'Project'
      left join assignments a on p.id = a.assignable_id and a.assignable_type = 'Project' and a.user_id = ?
      where t.status = 'done'
      and p.id not in (
        select p.id
        from projects p
        inner join tasks t on p.id = t.taskable_id and t.taskable_type = 'Project'
        where t.status in ('backlog', 'planned', 'started')
      )
      and p.category_id = ?", user_id, category_id]
    )
  end

  def self.split_projects(project_id)
    Project.find_by_sql(
      ["select sp.id
      from projects p
      inner join splits s on p.id = s.project_id
      inner join projects sp on s.new_project_id = sp.id
      inner join tasks t on sp.id = t.taskable_id and t.taskable_type = 'Project'
      where t.status in ('planned', 'started')
      and p.id = ?", project_id]
    )
  end

end
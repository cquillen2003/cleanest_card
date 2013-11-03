class ChangeProjects < ActiveRecord::Migration
  def change
  	add_column :projects, :notes, :text
  	add_column :projects, :priority, :string
  	add_column :projects, :due_date, :date
  end
end

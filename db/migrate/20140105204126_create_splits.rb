class CreateSplits < ActiveRecord::Migration
  def change
    create_table :splits do |t|
      t.integer :project_id
      t.integer :new_project_id

      t.timestamps
    end
  end
end

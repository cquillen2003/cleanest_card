class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :linkable_id, :items_count
end

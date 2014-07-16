class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :linkable_id, :linkable_type, :items_count
  has_many :tasks
end

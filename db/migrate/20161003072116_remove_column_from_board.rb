class RemoveColumnFromBoard < ActiveRecord::Migration
  def change
    remove_column :boards, :boards_users
  end
end

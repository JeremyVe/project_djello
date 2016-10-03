class ChangeUserAssociationOnBoardTable < ActiveRecord::Migration
  def change

    remove_column :boards, :user_id
    add_column :boards, :boards_users, :integer, null: false
  end
end

class AddColumnToList < ActiveRecord::Migration
  def change
    add_column :lists, :description, :string, null: false
  end
end

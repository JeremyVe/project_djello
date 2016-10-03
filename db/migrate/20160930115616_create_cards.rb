class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title,                      null: false
      t.string :description,   default: "", null: false
      t.integer :list_id,                   null: false
      t.boolean :completed, default: false, null: false

      t.timestamps null: false
    end
  end
end

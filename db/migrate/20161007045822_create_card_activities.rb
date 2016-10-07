class CreateCardActivities < ActiveRecord::Migration
  def change
    create_table :card_activities do |t|

      t.integer :card_id, null: false
      t.string :description, null: false
      t.integer :user_id, null: false
      

      t.timestamps null: false
    end
  end
end

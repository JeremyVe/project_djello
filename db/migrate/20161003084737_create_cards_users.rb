class CreateCardsUsers < ActiveRecord::Migration
  def change
    create_table :cards_users do |t|

      t.integer :card_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end

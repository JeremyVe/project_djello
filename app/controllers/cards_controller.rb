class CardsController < ApplicationController
  before_action :authenticate_user!

  def show
    @card = current_user.boards.find_by_id(params[:board_id])
                        .lists.find_by_id(params[:list_id]).cards.find_by_id(params[:id])
    if @card
      respond_to do |format|
        format.json { render :json => @card.to_json(:include => [:list, :users]), status: 200 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: :unprocessable_entity }
      end
    end
  end

  def create
    @card = Board.find_by_id(params[:board_id]).lists.find_by_id(params[:list_id]).cards.build(whitelisted_params)
  
    if @card.save


      current_user.cards << @card

      respond_to do |format|
        format.json { render :json => @card, status: 201 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: :unprocessable_entity }
      end
    end
  end

  def update
    @card = current_user.boards.find_by_id(params[:board_id])
                        .lists.find_by_id(params[:list_id]).cards.find_by_id(params[:id])

    if @card.update(title: params[:title], description: params[:description], completed: params[:completed])
      respond_to do |format|
        format.json { render :json => @card, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: :unprocessable_entity }
      end
    end
  end


  def update_card_users
    @card = Card.find_by_id(params[:id])
    @user = User.find_by_id(params[:new_user_id])
    @board = Board.find_by_id(params[:board_id])

    if @user && @card

      @card.users << @user
      @board.users << @user

      respond_to do |format|
        format.json { render :json => @user, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => true, status: :unprocessable_entity }
      end
    end
  end

  private

  def whitelisted_params
    params.require(:card).permit(:title, :description, :completed)
  end
end

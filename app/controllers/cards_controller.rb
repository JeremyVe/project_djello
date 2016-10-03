class CardsController < ApplicationController
  before_action :authenticate_user!

  def show
    @card = current_user.boards.find_by_id(params[:board_id])
                        .lists.find_by_id(params[:list_id]).cards.find_by_id(params[:id])
    if @card
      respond_to do |format|
        format.json { render :json => @card.to_json(:include => :list), status: 200 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: :unprocessable_entity }
      end
    end
  end

  def create
    @card = current_user.boards.find_by_id(params[:board_id])
                        .lists.find_by_id(params[:list_id]).cards.build(whitelisted_params)
  
    if @card.save
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

  private

  def whitelisted_params
    params.require(:card).permit(:title, :description, :completed)
  end
end

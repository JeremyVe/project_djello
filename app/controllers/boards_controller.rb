class BoardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_board, only: [:show, :destroy]

  respond_to :json

  def index
    @boards = current_user.boards()

    respond_to do |format|
      format.json { render :json => @boards, status: 200 }
    end
  end

  def create
    @board = current_user.boards.build(whitelisted_params)

    if @board.save
      respond_to do |format|
        format.json { render :json => @board, status: 201 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: :unprocessable_entity }
      end
    end
  end

  def show
    
    respond_to do |format|
      format.json { render :json => @board, status: 200 }
    end
  end

  def destroy
    if @board.destroy
      respond_to do |format|
        format.json { render nothing: true, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: :unprocessable_entity }
      end
    end
  end

  private

  def whitelisted_params
    params.require(:board).permit(:title)
  end

  def set_board
    @board = current_user.boards.find_by_id(params[:id])
    unless @board
      respond_to do |format|
        format.json { render nothing: true, status: :unprocessable_entity }
      end
    end
  end

end

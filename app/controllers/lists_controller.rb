class ListsController < ApplicationController
  before_action :authenticate_user!

  respond_to :json


  def index
    @lists = current_user.boards.find(params[:board_id]).lists

    respond_to do |format|
      format.json { render :json => @lists.to_json(include: :cards), status: 200 }
    end
  end

  def create
    @list = current_user.boards.find(params[:board_id]).lists.build(whitelisted_params)

    if @list.save
      respond_to do |format|
        format.json { render :json => @list, status: 201 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => true, status: :unprocessable_entity }
      end
    end
  end

  def update
    @list = current_user.boards.find_by_id(params[:board_id]).lists.find_by_id(params[:id]);

    if @list.update(:title => params[:title], :description => params[:description])
      respond_to do |format|
        format.json { render :json => @list, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => true, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @list = current_user.boards.find_by_id(params[:board_id]).lists.find_by_id(params[:id]);

    if @list.destroy
      respond_to do |format|
        format.json { render :nothing => true, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => true, status: :unprocessable_entity }
      end
    end
  end

  private

  def whitelisted_params
    params.require(:list).permit(:title, :description)
  end

end

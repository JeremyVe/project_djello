class CardActivitiesController < ApplicationController

  def create
    @activity = current_user.cards.find_by_id(params[:card_id]).card_activities.build(whitelisted_params)

    @activity.user_id = current_user.id
    
    if @activity.save

      respond_to do |format|
        format.json {render :json => @activity, status: 201}
      end
    else
      respond_to do |format|
        format.json {render nothing: true, status: :unprocessable_entity}
      end
    end
  end


  private


  def whitelisted_params
    params.require(:card_activity).permit(:description)
  end

end

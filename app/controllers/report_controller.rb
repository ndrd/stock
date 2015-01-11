class ReportController < ApplicationController

	def index
		@reports = Report.all
	end

	def show
		@report = Report.find_by_day(params[:id].to_time)
		#create if not exists
		if @report == nil and params[:id] == Time.zone.today.to_s
			today
		end
		#update the report
		if @report and params[:id] == Time.zone.today.to_s
			update
		end
	end

	def make_reports
		#hope for review a ticket
	end

	private 
		def today 
			set_user
			#create today report
			@report = Report.new
			@report.day = Time.zone.today
			@report.total = Ticket.where("check_out_date >= ? AND check_out_date <= ?", Time.zone.now.beginning_of_day, Time.zone.now.end_of_day ).sum(:total)
			@report.items = Ticket.where("check_out_date >= ? AND check_out_date <= ?", Time.zone.now.beginning_of_day, Time.zone.now.end_of_day ).sum(:items)
			@report.username = @user.username
			@report.save
		end

		def update 
			set_user
			#create today report
			@report = Report.find_by_day(Time.zone.today)
			@report.updated_at = Time.zone.now
			@report.total = Ticket.where("check_out_date >= ? AND check_out_date <= ?", Time.zone.now.beginning_of_day, Time.zone.now.end_of_day ).sum(:total)
			@report.items = Ticket.where("check_out_date >= ? AND check_out_date <= ?", Time.zone.now.beginning_of_day, Time.zone.now.end_of_day ).sum(:items)
			@report.save
		end

		def set_user
			if session[:current_user_id] != nil
				@user = User.find(session[:current_user_id])
			end
		end
end

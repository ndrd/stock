class ReportController < ApplicationController

	def index
		if session[:current_user_id] == nil
			redirect_to "/login" and return
		end

		details = params[:details]
		format = params[:f]
		@date = Time.zone.today
		if details
			if details == "week"
				@date = 1.week.ago.to_s.to_date.to_s + " | " + Time.zone.today.to_s
				@reports = Report.where("day <= ? AND day >= ? ", Time.zone.today.to_s, 1.week.ago.to_s)
			elsif details == "month"
				@date = 1.month.ago.to_s.to_date.to_s + " | " + Time.zone.today.to_s
				@reports = Report.where("day <= ? AND day >= ? ", Time.zone.today.to_s, 1.month.ago.to_s)
			elsif details == "year"
				@date = 1.year.ago.to_s.to_date.to_s + " | " + Time.zone.today.to_s
				@reports = Report.where("day <= ? AND day >= ? ", Time.zone.today.to_s, 1.year.ago.to_s)
			end	
		else
			update
			@reports = Report.last
			@bars = false
		end

		if format == 'json'
			render json: @reports
		end

	end

	def show
		
		if session[:current_user_id] == nil
			redirect_to "/login" and return
		end

		@report = Report.find_by_day(params[:id].to_time)
		#create if not exists
		if @report == nil and params[:id] == Time.zone.today.to_s
			puts 'Reach today'
			today
		end
		#update the report
		if @report and params[:id] == Time.zone.today.to_s
			update
		end

		format = params[:f]


		if format == 'json'
			render json: @report
		end

	end


	def show_json
		if session[:current_user_id] == nil
			redirect_to "/login" and return
		end

		@report = Report.find_by_day(params[:id].to_time)
		#create if not exists
		if @report == nil and params[:id] == Time.zone.today.to_s
			puts 'Reach today'
			today
		end
		#update the report
		if @report and params[:id] == Time.zone.today.to_s
			update
		end
		render json: @report
	end

	def make_reports
		set_user
		dates = Ticket.find_by_sql("select distinct check_out_date::date from tickets order by check_out_date")
		dates.each do |date|
			report_of_day(date.check_out_date)
		end
		render json: Report.all
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
			if @report == nil
				@report = Report.new
				@report.day = Time.zone.today
			end
			@report.username = @user.username
			@report.updated_at = Time.zone.now
			@report.total = Ticket.where("check_out_date >= ? AND check_out_date <= ?", Time.zone.now.beginning_of_day, Time.zone.now.end_of_day ).sum(:total)
			@report.items = Ticket.where("check_out_date >= ? AND check_out_date <= ?", Time.zone.now.beginning_of_day, Time.zone.now.end_of_day ).sum(:items)
			@report.save
		end

		def report_of_day(day)
			@report = Report.find_by_day(day)
			if @report == nil
				@report = Report.new
				@report.day = day
			end
			@report.username = @user.username
			@report.updated_at = Time.zone.now
			start_of_day = day.beginning_of_day.change(:offset => "CST")
			puts start_of_day
			end_of_day = day.end_of_day.change(:offset => "CST")
			@report.total = Ticket.where("check_out_date >= ? AND check_out_date <= ?", start_of_day, end_of_day ).sum(:total)
			@report.items = Ticket.where("check_out_date >= ? AND check_out_date <= ?", start_of_day, end_of_day ).sum(:items)
			@report.save
		end


		def set_user
			if session[:current_user_id] != nil
				@user = User.find(session[:current_user_id])
			end
		end


end

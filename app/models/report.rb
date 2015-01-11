class Report < ActiveRecord::Base
	extend FriendlyId
  	friendly_id :day, use: :slugged

end

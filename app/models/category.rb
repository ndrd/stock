class Category < ActiveRecord::Base
	extend FriendlyId
  	friendly_id :description, use: :slugged

end

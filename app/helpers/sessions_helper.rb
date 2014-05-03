module SessionsHelper
	
	def sign_in(user)
		cookies.permanent[:remember_token] = user.remember_token
		self.current_user = user
	end
	
	def signed_in?
		!current_user.nil?
	end
	
	def current_user=(user)
		@current_user = user
	end
	
	def current_user
		@current_user ||= User.find_by_remember_token(cookies[:remember_token])
	end
	
	def current_user?(user)
		user == current_user
	end
	
	def sign_out
		self.current_user = nil
		cookies.delete(:remember_token)
	end


	#Mobile detection and preference

	def mobile_view
		if mobile_request?
			prepend_view_path Rails.root + 'app' + 'views_mobile'
		end
	end

	def mobile_request?
		request.user_agent =~ /(iPhone|iPod|Android|Windows Phone)/
	end



end

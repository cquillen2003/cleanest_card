class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  after_filter  :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end
  
  #Force signout to prevent CSRF attacks (from Rails Tutorial 3.2 Listing 8.14)
  def handle_unverified_request
  	sign_out
  	super
  end

  protected

   	def verified_request?
    	super || form_authenticity_token == request.headers['X_XSRF_TOKEN']
  	end  

end

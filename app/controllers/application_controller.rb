class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper
  
  #Force signout to prevent CSRF attacks (from Rails Tutorial 3.2 Listing 8.14)
  def handle_unverified_request
  	sign_out
  	super
  end
end

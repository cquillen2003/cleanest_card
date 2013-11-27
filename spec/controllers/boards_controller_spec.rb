require 'spec_helper'

describe BoardsController do

  describe "GET 'plan'" do
    it "returns http success" do
      get 'plan'
      response.should be_success
    end
  end

  describe "GET 'current'" do
    it "returns http success" do
      get 'current'
      response.should be_success
    end
  end

end

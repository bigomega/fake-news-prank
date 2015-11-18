require 'sinatra'
require 'uri'
require 'net/http'

set :public_folder, File.dirname(__FILE__) + '/static'

get '/' do
  send_file 'views/cnn_index.html'
end

get '/2015/11/18/india/chennai-threat-at-a-glance/index.html' do
  send_file 'views/cnn_article.html'
end

not_found do
  uri = URI.parse('http://edition.cnn.com' + request.path)
  http = Net::HTTP.new(uri.host, uri.port)
  req = Net::HTTP::Get.new(uri.request_uri)
  req['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
  req['Accept'] = '*/*'
  response = http.request(req)
  response.body
end

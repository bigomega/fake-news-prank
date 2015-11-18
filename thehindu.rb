require 'sinatra'
require 'uri'
require 'net/http'

# set :port, 80
set :bind, '0.0.0.0'

get '/' do
  send_file 'views/thehindu_index.html'
end

get '/news/national/tamil-nadu/chennai-isis-threat/article7887856.ece' do
  send_file 'views/thehindu_article.html'
end

not_found do
  uri = URI.parse('http://thehindu.com' + request.path)
  http = Net::HTTP.new(uri.host, uri.port)
  req = Net::HTTP::Get.new(uri.request_uri)
  req['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
  req['Accept'] = '*/*'
  response = http.request(req)
  response.body
end

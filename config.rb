# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compressed
# end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

set :app_name, "Harmony Boilerplate"

# These two items will be different when deploying
# ------------------------------------------------
# url_prefix must have a leading and trailing slash
#    or condensned into one if there is no prefix.
set :url_prefix, '/'
set :absolute_prefix, 'http://localhost:4567'
# ------------------------------------------------

# Social buttons
set :facebook_app_id, '179668695452017'
set :twitter, 'verge'
set :twitter_account_id, '1465737598'
set :default_share_text, 'SPONSORED: TODO - add share text'

set :site_name, 'theverge.com'
set :twitter, 'theverge'

# Reload the browser automatically whenever files change
activate :livereload

helpers Middleman::Chorus::GoogleDrive::Helpers
spreadsheet_id = "1S4_7uPxYVWISOST-Cl1N00g0J0CfaR2Xdpyja9ifKIM"
load_spreadsheet("index",  spreadsheet_id, :gid => 0)
load_spreadsheet("week_1", spreadsheet_id, :gid => 1)
load_spreadsheet("week_2", spreadsheet_id, :gid => 2)
load_spreadsheet("week_3", spreadsheet_id, :gid => 3)
load_spreadsheet("week_4", spreadsheet_id, :gid => 4)
load_spreadsheet("week_5", spreadsheet_id, :gid => 5)
load_spreadsheet("week_6", spreadsheet_id, :gid => 6)
load_spreadsheet("week_7", spreadsheet_id, :gid => 7)
load_spreadsheet("week_8", spreadsheet_id, :gid => 8)
load_spreadsheet("week_9", spreadsheet_id, :gid => 9)
load_spreadsheet("week_10", spreadsheet_id, :gid => 10)

# Load the first index view
weeks = [data.index];
(1..10).each do |week_number|
  weeks << data.send("week_#{week_number}")
end

# Routes for weeks!
activate :directory_indexes

ignore "/week_template.html"
ignore "/will-be-index.html.erb"
ignore "/partials/*"

published_weeks = weeks.select {|week_data|
  week_data.detect{|row| row.kind == "published" && (row.title == "1" ||
                                                     row.title.to_s.downcase == "true" ||
                                                     row.title.to_s.downcase == "yes") }
}

puts "published_weeks count: #{published_weeks.length}"

# uncomment to show all articles regardless of published state
# published_weeks = weeks

published_weeks.each_with_index do |week,week_index|
  human_index = week_index + 1
  puts "Publishing week: #{human_index}"
  proxy "/week-#{human_index}/index.html",
        "will-be-index.html",
        :locals => {:weeks => published_weeks,
                    :active_slug => "week-#{human_index}",
                    :slug => "week-#{human_index}" }
end

proxy '/index.html', 'will-be-index.html', :locals => {:weeks => published_weeks}


# Build-specific configuration
configure :build do
  puts "local build"

  # clear out sprites
  system "rm -f source/images/sprites/*.png"

  activate :asset_hash,:ignore=>[/sprites\/.+\.png$/]
  activate :chorus
  activate :minify_javascript
  activate :minify_css

  # Should have a leading and trailing slash
  set :url_prefix, "/sponsored/harmony-boilerplate/"
  set :absolute_prefix, "http://www.theverge.com"
end


#
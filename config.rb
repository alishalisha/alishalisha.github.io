# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compressed
# end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

set :app_name, "Harmony Boilerplate"
set :sponsor_name, "TODO – CHANGE THIS"

# These two items will be different when deploying
# -----------------------------------------------------------
# url_prefix must have a leading and trailing slash
#    or condensned into one if there is no prefix.
set :url_prefix, '/'
set :url_host, 'http://localhost:4567'
# -----------------------------------------------------------

# Social buttons --------------------------------------------
set :facebook_app_id, '179668695452017'
set :twitter, 'theverge'
set :twitter_account_id, '1465737598'
# If the sheet for this week does not contain a share_text field this will be used
set :default_share_text, 'SPONSORED: TODO - add share text'
# -----------------------------------------------------------

# Reload the browser automatically whenever files change
activate :livereload

helpers Middleman::Chorus::GoogleDrive::Helpers

# CHANGE this to match your spreadsheet id
spreadsheet_id = "0Aq4r9E2MjHrBdHdvTExMbEdoUDVqZTFISjFvazM4Smc"

load_spreadsheet("index",  spreadsheet_id, :gid => 0)
load_spreadsheet("week_1", spreadsheet_id, :gid => 13)
load_spreadsheet("week_2", spreadsheet_id, :gid => 14)
load_spreadsheet("week_3", spreadsheet_id, :gid => 15)
load_spreadsheet("week_4", spreadsheet_id, :gid => 16)
load_spreadsheet("week_5", spreadsheet_id, :gid => 17)
load_spreadsheet("week_6", spreadsheet_id, :gid => 18)
load_spreadsheet("week_7", spreadsheet_id, :gid => 19)
load_spreadsheet("week_8", spreadsheet_id, :gid => 20)
load_spreadsheet("week_9", spreadsheet_id, :gid => 21)
load_spreadsheet("week_10", spreadsheet_id, :gid => 22)

# Load the first index view
weeks = [data.index]

(1..10).each do |week_number|
  weeks << data.send("week_#{week_number}")
end

# Routes for weeks!
activate :directory_indexes

ignore "/main.html"
ignore "/partials/*"

published_weeks = weeks.select {|week_data|
  week_data.detect{|row| row.kind == "published" && (row.title == "1" ||
                                                     row.title.to_s.downcase == "true" ||
                                                     row.title.to_s.downcase == "yes") }
}

# Build the slugs out for each page.
week_slugs = []
published_weeks.each_with_index do |week_data, index|
  slug = week_data.detect{|row| row.kind == "page_title"}.fetch("title","week-#{(index+1)}")
  slug = "#{index+1}/" + slug.split(/\W/).join('-') #make it url friendly
  week_slugs << slug.downcase
end

puts "published_weeks count: #{published_weeks.length}"

# uncomment to show all articles regardless of published state
# published_weeks = weeks

published_weeks.each_with_index do |week,week_index|
  human_index = week_index + 1
  slug = week_slugs[week_index]
  puts "Publishing week: #{human_index} >> #{slug}"
  proxy "/#{slug}/index.html",
        "main.html",
        :locals => {:weeks => published_weeks,
                    :active_slug => slug,
                    :slug => slug,
                    :slugs => week_slugs }
end

proxy "/index.html",'main.html', :locals => {:weeks => published_weeks, :slugs => week_slugs}

# Build-specific configuration
configure :build do
  puts "local build"

  activate :asset_hash
  activate :chorus
  activate :minify_javascript
  activate :minify_css

  # Should have a leading and trailing slash
  set :url_prefix, "/sponsored/harmony-boilerplate/"
  set :url_host, "http://www.theverge.com"
end
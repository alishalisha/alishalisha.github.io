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

# Tracking / Metrics ----------------------------------------
# to ignore a tracker, set the value to an blank string: ''
# uncomment as necessary

# -----------------------------------------------------------
# THEVERGE.COM
set :google_analytics_account,  'UA-26533115-1'
set :chartbeat_domain,          'theverge.com'
set :quantcast_id,              'p-d9vfr8QTWnv1E'
set :comscore_id,               '7976662'
set :umbel_id,                  'lrjhazrpqbgtnrij'

# -----------------------------------------------------------
# POLYGON.COM
# set :google_analytics_account,  'UA-29192711-1'
# set :chartbeat_domain,          'polygon.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  'lcojgvtzjxmbjdgh'

# -----------------------------------------------------------
# SBNATION.COM
# set :google_analytics_account,  'UA-20975224-1'
# set :chartbeat_domain,          'sbnation.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  'rhrdgrjixmwngtzk'

# -----------------------------------------------------------
# RACKED.COM
# set :google_analytics_account,  'UA-189494-75'
# set :chartbeat_domain,          'racked.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  ''


# -----------------------------------------------------------
# EATER.COM
# set :google_analytics_account,  'UA-189494-73'
# set :chartbeat_domain,          'eater.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  ''


# -----------------------------------------------------------
# CURBED.COM
# set :google_analytics_account,  'UA-189494-74'
# set :chartbeat_domain,          'curbed.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  ''

# -----------------------------------------------------------
# VOX.COM
# set :google_analytics_account,  'UA-48698701-1'
# set :chartbeat_domain,          'vox.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  'epuhlnvvrdpvqsnz'
# -----------------------------------------------------------

# -----------------------------------------------------------
# These can be styled via css and will use the partials/_kind_image.html.erb
set :image_types, ['image', 'left', 'right', 'overlay', 'divider']
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
  title = week_data.detect{|row| row.kind == "page_title"}.fetch("title")
  if index > 0
    slug = "week-#{index}"
    if title.present?
      slug += "-" + title.split(/\W/).join('-').downcase
    end
  else
    slug = ''
  end
  week_slugs << slug
end

puts "published_weeks count: #{published_weeks.length}"

# uncomment to show all articles regardless of published state
# published_weeks = weeks

published_weeks.each_with_index do |week,week_index|
  slug = week_slugs[week_index]
  puts "Publishing week: #{week_index == 0 ? 'index' : week_index} >> #{slug}"
  proxy "/#{slug}/index.html",
        "main.html",
        :locals => {:weeks => published_weeks,
                    :active_slug => slug,
                    :slug => slug,
                    :slugs => week_slugs }

  # Can use old slugs too
  proxy "/week-#{week_index}/index.html",
        "main.html",
        :locals => {:weeks => published_weeks,
                    :active_slug => slug,
                    :slug => slug,
                    :slugs => week_slugs }
end

proxy "/index.html",'main.html', :locals => {:weeks => published_weeks,
                                             :slugs => week_slugs,
                                             :slug => week_slugs.first,
                                             :active_slug => week_slugs.first}

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

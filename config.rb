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
# GOOGLE ANALYTICS: Vox Creative account
set :google_analytics_account,  'UA-48698701-1'

# -----------------------------------------------------------
# THEVERGE.COM
set :chartbeat_domain,          'theverge.com'
set :quantcast_id,              'p-d9vfr8QTWnv1E'
set :comscore_id,               '7976662'
set :umbel_id,                  'lrjhazrpqbgtnrij'

# -----------------------------------------------------------
# POLYGON.COM
# set :chartbeat_domain,          'polygon.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  'lcojgvtzjxmbjdgh'

# -----------------------------------------------------------
# SBNATION.COM
# set :chartbeat_domain,          'sbnation.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  'rhrdgrjixmwngtzk'

# -----------------------------------------------------------
# RACKED.COM
# set :chartbeat_domain,          'racked.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  ''


# -----------------------------------------------------------
# EATER.COM
# set :chartbeat_domain,          'eater.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  ''


# -----------------------------------------------------------
# CURBED.COM
# set :chartbeat_domain,          'curbed.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  ''

# -----------------------------------------------------------
# VOX.COM
# set :chartbeat_domain,          'vox.com'
# set :quantcast_id,              'p-d9vfr8QTWnv1E'
# set :comscore_id,               '7976662'
# set :umbel_id,                  'epuhlnvvrdpvqsnz'
# -----------------------------------------------------------

# -----------------------------------------------------------
# These can be styled via css and will use the partials/_kind_image.html.erb
set :image_types, ['image', 'left', 'right', 'overlay', 'divider']
# -----------------------------------------------------------

set :next_click_teaser_text, "You may also be interested in..."
# set :next_click_teaser_frequency, 3 #show every three next clicks

# Reload the browser automatically whenever files change
activate :livereload

helpers Middleman::Chorus::GoogleDrive::Helpers

# CHANGE this to match your spreadsheet id
spreadsheet_id = "0AgDG7fgkwz50dGdZcm83bkc1MW5BSXlCajBDbHBMQkE"

load_spreadsheet("index",  spreadsheet_id, :gid => 0)
load_spreadsheet("episode_1", spreadsheet_id, :gid => 13)
load_spreadsheet("episode_2", spreadsheet_id, :gid => 14)
load_spreadsheet("episode_3", spreadsheet_id, :gid => 15)
load_spreadsheet("episode_4", spreadsheet_id, :gid => 16)
load_spreadsheet("episode_5", spreadsheet_id, :gid => 17)
load_spreadsheet("episode_6", spreadsheet_id, :gid => 25)
load_spreadsheet("episode_7", spreadsheet_id, :gid => 32)
load_spreadsheet("episode_8", spreadsheet_id, :gid => 33)
# load_spreadsheet("episode_9", spreadsheet_id, :gid => 34)
# load_spreadsheet("episode_10", spreadsheet_id, :gid => 35)
# load_spreadsheet("episode_11", spreadsheet_id, :gid => 36)
# load_spreadsheet("episode_12", spreadsheet_id, :gid => 37)
# load_spreadsheet("episode_13", spreadsheet_id, :gid => 38)
# load_spreadsheet("episode_14", spreadsheet_id, :gid => 41)
# load_spreadsheet("episode_15", spreadsheet_id, :gid => 42)
# load_spreadsheet("episode_16", spreadsheet_id, :gid => 43)
# load_spreadsheet("episode_17", spreadsheet_id, :gid => 44)
# load_spreadsheet("episode_18", spreadsheet_id, :gid => 45)
# load_spreadsheet("episode_19", spreadsheet_id, :gid => 46)
# load_spreadsheet("episode_20", spreadsheet_id, :gid => 47)
# load_spreadsheet("episode_21", spreadsheet_id, :gid => 48)
# load_spreadsheet("episode_22", spreadsheet_id, :gid => 49)
# load_spreadsheet("episode_23", spreadsheet_id, :gid => 50)
# load_spreadsheet("episode_24", spreadsheet_id, :gid => 51)
# load_spreadsheet("episode_25", spreadsheet_id, :gid => 52)
# load_spreadsheet("episode_26", spreadsheet_id, :gid => 53)
# load_spreadsheet("episode_27", spreadsheet_id, :gid => 54)
# load_spreadsheet("episode_28", spreadsheet_id, :gid => 55)
# load_spreadsheet("episode_29", spreadsheet_id, :gid => 56)
# load_spreadsheet("episode_30", spreadsheet_id, :gid => 57)
# load_spreadsheet("episode_31", spreadsheet_id, :gid => 58)
# load_spreadsheet("episode_32", spreadsheet_id, :gid => 59)
# load_spreadsheet("episode_33", spreadsheet_id, :gid => 60)
# load_spreadsheet("episode_34", spreadsheet_id, :gid => 61)
# load_spreadsheet("episode_35", spreadsheet_id, :gid => 62)
# load_spreadsheet("episode_36", spreadsheet_id, :gid => 63)
# load_spreadsheet("episode_37", spreadsheet_id, :gid => 64)
# load_spreadsheet("episode_38", spreadsheet_id, :gid => 65)
# load_spreadsheet("episode_39", spreadsheet_id, :gid => 66)
# load_spreadsheet("episode_40", spreadsheet_id, :gid => 67)


# Load the first index view
episodes = [data.index]

# We could use .each on data, but the ordering is not guarenteed
# this enforces the correct order.
(1..100).each do |index|
  episodes << data.send("episode_#{index}") if data.has_key?("episode_#{index}")
end

# Routes for episodes!
activate :directory_indexes

ignore "/main.html"
ignore "/partials/*"

published_episodes = episodes.select {|episode|
  episode.detect{|row| row.kind == "published" && (row.title == "1" ||
                                                   row.title.to_s.downcase.include?('true') ||
                                                   row.title.to_s.downcase.include?('yes')) }
}

# Build the slugs out for each page.
episode_slugs = []
published_episodes.each_with_index do |episode, index|
  title = episode.detect{|row| row.kind == "page_title"}.fetch("title")
  if index > 0
    slug = "episode-#{index}"
    if title.present?
      slug += "-" + title.split(/\W/).join('-').downcase
    end
  else
    slug = ''
  end
  episode_slugs << slug
end

puts "published episodes count: #{published_episodes.length}"

published_episodes.each_with_index do |episode,index|
  slug = episode_slugs[index]
  puts "Publishing episode: #{index == 0 ? 'index' : index} >> #{slug}"
  proxy "/#{slug}/index.html".gsub(/\/\/+/,'/'),
        "main.html",
        :locals => {:episodes => published_episodes,
                    :active_slug => slug,
                    :slug => slug,
                    :slugs => episode_slugs }

  # Can use old slugs too
  proxy "/episode-#{index}/index.html",
        "main.html",
        :locals => {:episodes => published_episodes,
                    :active_slug => slug,
                    :slug => slug,
                    :slugs => episode_slugs }
end

proxy "/index.html",'main.html', :locals => {:episodes => published_episodes,
                                             :slugs => episode_slugs,
                                             :slug => episode_slugs.first,
                                             :active_slug => episode_slugs.first}

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

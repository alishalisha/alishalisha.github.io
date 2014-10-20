require 'json'
def get_url_for_domain(domain)
  case domain
  when /sbnation/i
    'http://www.sbnation.com/admin/editorial_apps/?community_id=247'
  when /polygon/i
    'http://www.polygon.com/admin/editorial_apps/?community_id=405'
  when /vox creative/i
    'http://product.voxmedia.com/admin/editorial_apps/?community_id=443'
  when /vox/i
    'http://www.vox.com/admin/editorial_apps/?community_id=441'
  when /verge/i
    'http://www.theverge.com/admin/editorial_apps/?community_id=372'
  else
    ''
  end
end


namespace :harmony do
  task :read_config do
    config_file_path = File.join(File.dirname(__FILE__),'config.rb')
    chorus_config_file_path = File.join(File.dirname(__FILE__),'chorus-config.json')

    @config = ""
    @chorus_config = {}
    @community = ''

    if File.exist?(config_file_path)
      @config = File.read(config_file_path)
    end

    if File.exist?(chorus_config_file_path)
      @chorus_config = JSON.parse(File.read(chorus_config_file_path))
      @community = @chorus_config.fetch('community','')
    end
  end

  desc "Open Google Spreadsheet"
  task :doc => :read_config do
    config_rb_spreadsheet_variable_name = 'spreadsheet_id'
    url_prefix = "https://docs.google.com/a/voxmedia.com/spreadsheet/ccc?key="

    # http://rubular.com/r/2S006Q8ESy
    spreadsheet_id_matches = Regexp.new(config_rb_spreadsheet_variable_name.to_s + '\s*=\s*"(.*)"').match(@config)
    if(spreadsheet_id_matches && spreadsheet_id_matches.size >= 2)
      spreadsheet_id = spreadsheet_id_matches[1]
      puts "Opening #{url_prefix}#{spreadsheet_id}"
      `open "#{url_prefix}#{spreadsheet_id}"`
    else
      puts "Can't find #{config_rb_spreadsheet_variable_name} in config.rb"
    end
  end

  desc "Open Editorial App Admin"
  task :chorus => :read_config do
    if @community.size > 0
      url = get_url_for_domain(@community)
      puts "Opening #{url}"
      `open "#{url}"`
    else
      puts "Could not find 'community' in chorus-config.json"
    end
  end

  desc "Open production site"
  task :site => :read_config do
    if @community.size > 0 && @chorus_config.fetch('url_prefix').size > 0
      url = "http://#{@community}#{@chorus_config.fetch('url_prefix')}"
      puts "Opening #{url}"
      `open "#{url}"`
    else
      puts "Could not find 'community' and/or 'url_prefix' in chorus-config.json"
    end
  end

  desc "Open WIKI Docs for Editorial Apps"
  task :wiki do
    `open "https://github.com/voxmedia/411/wiki/Editorial-App-&-Google-Docs-Integration"`
  end
end

module HarmonyHelpers
  @@last_section_class = nil
  class Link
    attr_accessor :title, :url;
  end

  def parse_link(link_text_from_row, default_title="Read more...")
    link = Link.new
    link.title = default_title
    link.url = link_text_from_row

    markdown_syntax_link = /\[([^\]]+)\]\(([^)]+)\)/.match(link_text_from_row)

    # this is markdown syntax!
    if(!markdown_syntax_link.nil? && markdown_syntax_link.size == 3)
      link.title = markdown_syntax_link[1]
      link.url =   markdown_syntax_link[2]
    end

    link
  end

  def get_meta(row, default_value = '')
    if row.meta.present?
      begin
        JSON.parse(row.try(:meta))
      rescue JSON::ParserError
        row.try(:meta)
      end
    else
      default_value
    end
  end

  def set_section(class_name_for_section)
    section_text = ''
    if @@last_section_class.nil?
      section_text = "<section class='#{class_name_for_section}'>"
    elsif @@last_section_class != class_name_for_section
      section_text = "</section><section class='#{class_name_for_section}'>"
    end
    @@last_section_class = class_name_for_section
    return section_text
  end

end
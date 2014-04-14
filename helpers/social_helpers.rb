# social_helpers.rb
module SocialHelpers

  # Link to share a link on twitter
  def tweet(url = nil, text = nil)
    text ||= app_name
    "https://twitter.com/share?url=#{CGI.escape(url)}&amp;text=#{CGI.escape(text)}"
  end

  # Link to share a link on facebook
  def facebook(url = nil)
    "https://www.facebook.com/sharer/sharer.php?u=#{CGI.escape(url)}"
  end

  # Link to share a link on g+
  def google_plus(url = nil)
    "https://plus.google.com/share?url=#{CGI.escape(url)}"
  end
end
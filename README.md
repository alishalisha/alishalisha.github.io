# Editorial App Template for Sponsored Content as part of the Harmony Project

For a complete readme and understanding of an Editorial App [read the documentation](https://github.com/voxmedia/411/wiki/Editorial-App-&-Google-Docs-Integration).

# Boilerplate Google Doc

You're gonna need to clone this: https://docs.google.com/a/sbnation.com/spreadsheet/ccc?key=0Aq4r9E2MjHrBdHdvTExMbEdoUDVqZTFISjFvazM4Smc&usp=sharing#gid=0

# Setting up and navigating the doc

Each row is a chunk of information. These can be displayed in different ways depending on what content is filled out.

The `kind` row is the most important, it signifies the type of content and how that content should be displayed.

The type options are:

_Configuration Kinds_

* published — '1', 'true' or 'yes' (in the title column) will cause the sheet to be published. Anything else in this row, the sheet will be ignored when building it.
* impression – use the image column to specify a pixel-tracker img src to load on page view. (You can include multiple rows of `impression` pixel trackers)
* page_title – Will set the page title (title column)
* share_text – Define the text shared from twitter, facebook and g+ (text column)

_Display Kinds_

* video — shows up in the video hero
* text — Just a paragraph of text (works with title and text)
* left — Image on the left, text on the right (works with title, text, image and links)
* right — Image on the right, text on the left (works with title, text, image and links)
* left_quote — Image on the left, quote on the left (works with title, text (quote), image and links)
* right_quote — Image on the right, quote on the left (works with title, text (quote), image and links)
* overlay — Text overlays the image (works with title, text, image and links)
* image — Full-width image (works with image and links)
* next — next-click link (works with title, text, image and links)
* divider - Adds a horizontal rule to the document

# Styling

The two files you should be most concerned with are `_config.scss` and `style.scss`. Config is just a list of variables that control various aspects of your design like how wide the text columns are, what fonts go where, and what colors various elements are. You should be able to get really far on just the configuration alone.

The `style.scss` file should start out blank at the beginning of every new project. This is where custom styles happen that go beyond the initial configuration. If you want to do anything custom, this is where that magic happens.


# Running Locally

1. Clone this.
2. Install dependencies `bundle install`
3. Start middleman `bundle exec middleman`

# Publishing and Deploying

[Read the Editorial App documentation](https://github.com/voxmedia/411/wiki/Editorial-App-&-Google-Docs-Integration).
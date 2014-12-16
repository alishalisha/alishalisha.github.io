(function($){

  var updateURLAndTitle = function(eventObject,data){
    var $activeArticle = data.activeArticle;
    var state = {};
    var activeSlug = $activeArticle.data('slug') || 'episode-0';
    var activeTitle = $activeArticle.data('page-title') || App.Context.app_name;
    var url = (App.Context.host_name || '') + (App.Context.url_prefix || '');

    // add slug for non index pages
    if(activeSlug !== 'episode-0'){
      url += activeSlug;
    }

    var params = "";
    if (typeof(location.origin) === "string" && typeof(location.pathname) === "string"){
      params = location.href.substr(location.origin.length + location.pathname.length,2000);
      url = url + params;
    }

    // Save this to use with
    App.Context.current_url = url;

    if( url !== (location.href) ) {
      // Trigger a page change event, if the URL changed
      $(document).triggerHandler('Harmony.page.change',{"url":url});

      // Update the title
      document.title = activeTitle;

      // Update the url
      if( typeof(window.history.replaceState) === "function" ){
        // make sure google tracks our magic
        _gaq.push(['_trackPageview', url]);
        var unusedTitle = '';
        window.history.replaceState(state, unusedTitle, url);
      }
    }
  };

  // This is something we want when a page changes
  $(document).on('Harmony.article.change',updateURLAndTitle);

})(jQuery);
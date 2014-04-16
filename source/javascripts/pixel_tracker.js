(function($){
  // Inserts pixel trackers into
  var setPixelTrackerForPage = function(eventObject, data){
    var $activeArticle = data.activeArticle;
    if($activeArticle.length > 0) {
      var randomThing = Math.round(Math.random()*10000);
      var pixels = $activeArticle.find("img.pixel-tracker");
      for( var i = 0; i < pixels.length; i++ ){
        var pixelSource = $(pixels).data('src') + randomThing;
        $(pixels.attr('src',pixelSource));
      }
    }
  };

  // This is something we want when a page changes
  $(document).on('Harmony.article.change',setPixelTrackerForPage);
})(jQuery);
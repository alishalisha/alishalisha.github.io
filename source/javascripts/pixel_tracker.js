(function($){
  // Inserts pixel trackers into
  var setPixelTrackerForPage = function(eventObject, data){
    var $activeArticle = data.activeArticle;
    if($activeArticle.length > 0) {
      var randomThing = Math.round(Math.random()*10000);
      $activeArticle.find("img.pixel-tracker").each(function(){
        var pixelSource = $(this).data('src') + "&harmonyRnd=" + randomThing;
        $(this).attr('src',pixelSource);
      });
    }
  };

  // This is something we want when a page changes
  $(document).on('Harmony.article.change',setPixelTrackerForPage);
})(jQuery);

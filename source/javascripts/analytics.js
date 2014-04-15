(function($){

  // Share window open
  var trackSocialClick = function(){
    var kindOfShare = $(this).data('share-via') || "social";
    recordEvent('Share', kindOfShare);
  };

  // Event name might be 'next', should be a single word
  // Event source might be 'keyboard'
  var recordEvent = function(action,label,value){
    console.log("TRACKING - ", arguments);
    if(typeof(value) === "undefined"){
      _gaq.push(['_trackEvent', App.Context.app_name, action, label]);
    } else {
      _gaq.push(['_trackEvent', App.Context.app_name, action, label, value]);
    }
  };

  // Can handle Harmony.event.track with data:
  // {action, label and value keys}
  $(document).on('Harmony.event.track',function(evnt,data){
    recordEvent(data.action, data.label, data.value);
  });
  // $(document).triggerHandler('Harmony.article.change', {activeArticle:$('article.active')});

  $(document).on('Harmony.article.change',function(evnt,data){
    console.log(data);
    // recordEvent(data.action, data.label, data.value);
  });

})(jQuery);
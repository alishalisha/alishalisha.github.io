(function($){

  // Event name might be 'next', should be a single word
  // Event source might be 'keyboard'
  var recordEvent = function(action,label,value){
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

  $(document).on('Harmony.article.change',function(evnt,data){
    if(data.direction){
      recordEvent('Navigation', data.direction);
    }
  });


})(jQuery);
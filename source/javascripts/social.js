(function ($) {

  var $buttons = $('a.nav__social__link');

  // Share window open
  var openShareWindow = function (e) {
    var $link = $(this);

    // _gaq.push(['_trackEvent', Verge.Context.app_name, $link.data('social'), $link.data('shared')]);
    if (e.which === 1 && !e.metaKey && !e.ctrlKey) {
      window.open($link.attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      return false;
    }
  };

  var trackSocialClick = function(){
    var kindOfShare = $(this).data('share-via') || "social";
    $(document).triggerHandler('Harmony.event.track', {action:"Share", label:kindOfShare});
  };

  console.log('attaching to ', $buttons);
  $buttons.on('click', openShareWindow);
  $buttons.on('click', trackSocialClick);

})(jQuery);
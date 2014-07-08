(function ($) {

  var $inArticleButtons = $('article a.nav__social__link');
  var $globalShareButtons = $('nav a.nav__social__link');

  var proxyToArticleHref = function(evnt) {
    var kindOfShare = $(this).data('share-via');
    var $target = $('article.active [data-share-via="'+kindOfShare+'"]');
    var url = $target.attr('href') || $(this).attr('href');
    window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    $(document).triggerHandler('Harmony.event.track', {action:"Share", label:kindOfShare});

    evnt.stopPropagation();
    evnt.preventDefault();

    return false;
  };

  // Share window open
  var openShareWindow = function (e) {
    var $link = $(this);
    if (e.which === 1 && !e.metaKey && !e.ctrlKey) {
      var kindOfShare = $link.data('share-via') || "social";
      $(document).triggerHandler('Harmony.event.track', {action:"Share", label:kindOfShare});
      window.open($link.attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      evnt.stopPropagation();
      evnt.preventDefault();
      return false;
    }
  };

  $inArticleButtons.on('click', openShareWindow);
  // So this only works when we have article sharing too :(
  $globalShareButtons.on('click', proxyToArticleHref);
})(jQuery);
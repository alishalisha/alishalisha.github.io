// social.js
var Verge = Verge || {};

Verge.Social = (function ($) {

  var $buttons = $('a.nav__social__link');

  var openShareWindow = function (e) {
    var $link = $(this);
    if (e.which === 1 && !e.metaKey && !e.ctrlKey) {
      window.open($link.attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      return false;
    }
  };

  // console.log('attaching to ', $buttons);
  $buttons.on('click', openShareWindow);

})(jQuery);
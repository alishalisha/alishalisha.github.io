// social.js
var Verge = Verge || {};

// // Grabs the active image URL for OpenGraph social sharing
// var openGraphImage = function () {
//   var activeImageURL = $('article.active .overlay').attr('data-image');
//   var metaOpenGraph = $('meta[property="og:image"]');
//   metaOpenGraph.content = activeImageURL;
// }

// // Update the current URL for OpenGraph
// var openGraphURL = function () {
//   var activeURL = "<%= absolute_prefix + url_prefix %>";
//   var metaOpenGraphURL = $('meta[property="og:image"]');
//   metaOpenGraphURL.content = activeURL;
// }

// // Call function on page load
// openGraphImage();

Verge.Social = (function ($) {

  var $buttons = $('a.nav__social__link');

  var openShareWindow = function (e) {
    var $link = $(this);
    // _gaq.push(['_trackEvent', Verge.Context.app_name, $link.data('social'), $link.data('shared')]);
    if (e.which === 1 && !e.metaKey && !e.ctrlKey) {
      window.open($link.attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      return false;
    }
  };

  // console.log('attaching to ', $buttons);
  $buttons.on('click', openShareWindow);

})(jQuery);
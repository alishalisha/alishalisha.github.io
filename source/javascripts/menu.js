// Powers a site wide menu
// Listens for events:
//    - Harmony.menu.toggle
//    - Harmony.menu.hide
//    - Harmony.menu.show
(function ($) {
  // Nav Menu Toggle function
  var toggleMenu = function() {
    $('ul.menu').toggleClass('active');
    return false;
  };

  // when the menu has class 'active' and the user clicks on the article element, toggle class active?
  var closeMenu = function() {
    $('ul.menu').removeClass('active');
  }

  $('article').on('click', function() {
    closeMenu();
  })

  $('.nav__burger').on('click', toggleMenu);

  var showMenu = function() {
    $('.menu').addClass('active');
    return false;
  };

  var hideMenu = function() {
    $('.menu').removeClass('active');
    return false;
  };

  // Watch for click events on the menu, j
  $("nav li a").on('click',function(evnt){
    evnt.stopPropagation();
    evnt.preventDefault();
    
    var index = $(this).data('index');
    $(document).triggerHandler('Harmony.article.goTo',{"articleIndex": index});
    $('body').scrollTop(0);
  });

  // Nav Menu Filtering function
  var $menuCategories = $('ul.menu-categories li');
  var $specialVideo = $('ul.menu-content li.video.special');
  var $menuContent = $('ul.menu-content li');

  $specialVideo.css('display', 'none');

  $menuCategories.click( function() {
    var $selectedCategory = $(this).data('category');
    if ($selectedCategory == 'latest') {
      $menuContent.css('display', 'normal');
      $specialVideo.css('display', 'none');
    } else {
      $menuContent.css('display', 'none');
      $('.'+$selectedCategory).css('display', 'normal');
    }
  });

  // Hiding video thumbnails unless someone clicks into the video tab
  var $videoTab = $('*[data-category="video"]');
  var $latestVideoEpisode = $('ul.menu-content li.video').first();
  var $latestTab = $('*[data-category="latest"]');
  var $amaTab = $('*[data-category="ama"]');
  var $infographicTab = $('*[data-category="infographic"]');
  var $longformTab = $('*[data-category="longform"]');
  var $videoGradient = $('.video-gradient');
  var $latestVideoMeta = $('ul.menu-content li.video .video-meta').first();

  var opacityToggle = function() {
    $menuCategories.addClass('inactive-category');
    $(this).removeClass('inactive-category');
  };

  $videoGradient.hide();
  $menuContent.addClass('no-bg-image');
  $menuCategories.addClass('inactive-category');
  $latestTab.removeClass('inactive-category');

  $videoTab.on('click', function() {
    $videoGradient.first().show();
    $latestVideoEpisode.removeClass('no-bg-image');
    $latestVideoEpisode.addClass('toggled-video');
    $latestVideoMeta.addClass('toggled-meta');
    $menuCategories.addClass('inactive-category');
    $(this).removeClass('inactive-category');
  });

  $latestTab.on('click', function() {
    $videoGradient.hide();
    $menuContent.addClass('no-bg-image');
    $latestVideoEpisode.removeClass('toggled-video');
    $latestVideoMeta.removeClass('toggled-meta');
    $menuCategories.addClass('inactive-category');
    $(this).removeClass('inactive-category');
  });

  // When article is changed, hide the menu
  $(document).on('Harmony.article.change',hideMenu);

  $infographicTab.on('click', opacityToggle);
  $longformTab.on('click', opacityToggle);
  $amaTab.on('click', opacityToggle);

  $(document).on('Harmony.menu.toggle', toggleMenu);
  $(document).on('Harmony.menu.hide', hideMenu);
  $(document).on('Harmony.menu.show', showMenu);

  // When menu item is clicked, always scroll back to top
  var scrollToTop = function () {
    body.scrollTop();
  }
  $('ul.menu-content li').on('click', function() {
    scrollToTop();
  })

})(jQuery);

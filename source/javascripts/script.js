(function($){
  var $articles = $('article');
  var $activeArticle = $('article.active');
  // these get setup later
  var $previousArticle = null;
  var $nextArticle = null;
  var $prevButton = $("#navigation a.prev");
  var $nextButton = $("#navigation a.next");
  var $twitterShareButton =    $('[data-share-via="twitter"]');
  var $facebookShareButton =   $('[data-share-via="facebook"]');
  var $googleplusShareButton = $('[data-share-via="googleplus"]');

  // check if we can log stuffs
  var canLog = (function(){
    return typeof(console) !== "undefined" && typeof(console.log) === "function";
  })();

  var KEYBOARD_CONSTANTS = {
           left: 37,
          right: 39,
              j: 74,
              k: 75
      };

  var showNextArticle = function(evnt){
    evnt.stopPropagation();
    evnt.preventDefault();

    if($nextArticle[0]){
      // Move classes around
      pauseVideoIfPlaying();

      // if it is keyboard identify it
      recordEvent('Navigation', 'Next');

      $activeArticle.removeClass('active').addClass('hidden');
      $nextArticle.addClass('active').removeClass('hidden').removeClass('next');
      $activeArticle = $nextArticle;
      setupNextAndPreviousArticle();
      updateURL();
      setPixelTrackerForThisPage();
    }
  };

  var showPreviousArticle = function(evnt){
    evnt.stopPropagation();
    evnt.preventDefault();

    // Move classes around
    if($previousArticle[0]){
      pauseVideoIfPlaying();

      // if it is keyboard identify it
      recordEvent('Navigation', 'Previous');

      $activeArticle.removeClass('active').addClass('hidden');
      $previousArticle.addClass('active').removeClass('hidden').removeClass('previous');

      // Now setup the articles
      $activeArticle = $previousArticle;
      setupNextAndPreviousArticle();
      updateURL();
      setPixelTrackerForThisPage();
    }
  };

  var displayApplicableArrows = function(){
    if($nextArticle[0]){
      $nextButton.show();
    } else {
      $nextButton.hide();
    }
    if($previousArticle[0]){
      $prevButton.show();
    } else {
      $prevButton.hide();
    }
  };

  // Event name might be 'next', should be a single word
  // Event source might be 'keyboard'
  var recordEvent = function(action,label,value){
    if(typeof(value) === "undefined"){
      _gaq.push(['_trackEvent', App.Context.app_name, action, label]);
    } else {
      _gaq.push(['_trackEvent', App.Context.app_name, action, label, value]);
    }
  };

  var updateURL = function(){
    var state = {};
    var activeSlug = $activeArticle.data('slug') || 'week-0';
    var url = (App.Context.host_name || '') + (App.Context.url_prefix || '');

    // add slug for non index pages
    if(activeSlug !== 'week-0'){
      url += activeSlug;
    }

    if( url !== location.pathname ) {
      if( typeof(window.history.replaceState) === "function" ){
        // make sure google tracks our magic
        _gaq.push(['_trackPageview', url]);
        var unusedTitle = '';
        window.history.replaceState(state, unusedTitle, url);
      }
    }

  };

  // Inserts pixel trackers into
  var setPixelTrackerForThisPage = function(){
    if($activeArticle.length > 0) {
      var randomThing = Math.round(Math.random()*10000);
      var pixels = $activeArticle.find("img.pixel-tracker");
      for( var i = 0; i < pixels.length; i++ ){
        var pixelSource = $(pixels).data('src') + randomThing;
        $(pixels.attr('src',pixelSource));
      }
    }
  };

  var setupNextAndPreviousArticle = function(){
    if($activeArticle[0]){
      //remove previous classes setup
      if($nextArticle){
        $nextArticle.removeClass('previous').removeClass('next');
      }
      if($previousArticle){
        $previousArticle.removeClass('previous').removeClass('next');
      }

      // change elements
      $nextArticle =     $activeArticle.next('article');
      $previousArticle = $activeArticle.prev('article');

      displayApplicableArrows();

      // setup new classes :)
      $nextArticle.addClass('next');
      $previousArticle.addClass('previous');

    }
  };

  var pauseVideoIfPlaying = function(){
    $(document).triggerHandler('Harmony.video.pause');
  };

  // Adds navigation via left/right and j/k keys.
  var keyboardNavigationHandler = function (evnt) {
    var key = evnt.keyCode || evnt.which;

    switch (key) {
    case KEYBOARD_CONSTANTS.j: case KEYBOARD_CONSTANTS.left:
      showPreviousArticle(evnt);
      return false;
      break;
    case KEYBOARD_CONSTANTS.k: case KEYBOARD_CONSTANTS.right:
      showNextArticle(evnt);
      return false;
      break;
    }
  };

  // Share window open
  var trackSocialClick = function(){
    var kindOfShare = $(this).data('share-via') || "social";
    recordEvent('Share', kindOfShare);
  };

  var rigUpVideoForContainer = function($videoContainer){
    var videoId = $videoContainer.data('video-id');
    var videoIndex = $videoContainer.data('video-index');
    var videoContainerDOMId = 'video-container-' + videoIndex;
    var $overlay = $videoContainer.siblings('.overlay');
    var overlayHiddenClass = 'hidden';

    recordEvent('Video','play',videoIndex);

    OO.Player.create(videoContainerDOMId, videoId, {
      onCreate: function(player) {
        var thisPlayer = player;
        var pausePlayer = function(){
          recordEvent('Video','pause',videoIndex);
          if(thisPlayer.getState() != "playing"){
            thisPlayer.destroy();
          } else {
            thisPlayer.pause();
            // if it doesn't respect pause kill it
            if(thisPlayer.getState() != "paused"){
              thisPlayer.destroy();
            }
          }

          $overlay.removeClass(overlayHiddenClass);
          $(document).off('Harmony.video.pause',pausePlayer);
        };

        // Attach listener
        $(document).on('Harmony.video.pause',pausePlayer);

        // Hide the cover once the video starts playing
        player.mb.subscribe(OO.EVENTS.PLAY, 'myPage', function(eventName) {
          $overlay.addClass(overlayHiddenClass);
        });

        // Auto play when able to.
        player.mb.subscribe(OO.EVENTS.PLAYBACK_READY, 'myPage',function(){
          player.play();
        });

        // Remove that class once the video is done.
        player.mb.subscribe(OO.EVENTS.PLAYED,'myPage', function(eventName) {
          $overlay.removeClass(overlayHiddenClass);
          player.destroy();
        });
      }
    });
  };

  // VIDEO STUFF
  var playMyVideo = function(){
    rigUpVideoForContainer($(this).siblings('.video-container'));
  };


  // Attach event handlers
  $nextButton.on('click', showNextArticle);
  $prevButton.on('click', showPreviousArticle);
  $(document).on('keydown', { source: 'Keyboard'}, keyboardNavigationHandler);
  $('a.nav__social__link').click(trackSocialClick);

  setupNextAndPreviousArticle();
  displayApplicableArrows();
  setPixelTrackerForThisPage();

  $('.video button').on('click',playMyVideo);
})(jQuery);
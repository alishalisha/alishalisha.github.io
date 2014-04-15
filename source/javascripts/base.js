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
  var onMobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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

      // if it is keyboard identify it
      recordEvent('Navigation', 'Next');

      $activeArticle.removeClass('active').addClass('hidden');
      $nextArticle.addClass('active').removeClass('hidden').removeClass('next');
      $activeArticle = $nextArticle;
      setupNextAndPreviousArticle();
      
      $(document).triggerHandler('Harmony.article.change', {activeArticle:$activeArticle});
    }
  };

  var showPreviousArticle = function(evnt){
    evnt.stopPropagation();
    evnt.preventDefault();

    // Move classes around
    if($previousArticle[0]){

      // if it is keyboard identify it
      recordEvent('Navigation', 'Previous');

      $activeArticle.removeClass('active').addClass('hidden');
      $previousArticle.addClass('active').removeClass('hidden').removeClass('previous');

      // Now setup the articles
      $activeArticle = $previousArticle;
      setupNextAndPreviousArticle();

      $(document).triggerHandler('Harmony.article.change',{activeArticle:$activeArticle});
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


  // Event name might be 'next', should be a single word
  // Event source might be 'keyboard'
  var recordEvent = function(action,label,value){
    if(typeof(value) === "undefined"){
      _gaq.push(['_trackEvent', App.Context.app_name, action, label]);
    } else {
      _gaq.push(['_trackEvent', App.Context.app_name, action, label, value]);
    }
  };

  // ----------- Video ------------------------------------------

  var rigUpVideoForContainer = function($videoContainer, isMuted){
    // We don't want to mute all videos do we? Just the first one
    // force this to a boolean value
    isMuted = (isMuted === true);

    var videoId = $videoContainer.data('video-id');
    var videoIndex = $videoContainer.data('video-index');
    var videoContainerDOMId = 'video-container-' + videoIndex;
    var $overlay = $videoContainer.siblings('.overlay');
    var overlayHiddenClass = 'hidden';

    // initially hide the replay option
    var $replayIcon = $videoContainer.siblings('.replay-control');
        $replayIcon.hide();

    var $unmuteIcon = $videoContainer.siblings('.unmute-icon');
    var $muteIcon = $videoContainer.siblings('.mute-icon');
        $muteIcon.hide();

    var $volumeControl = $videoContainer.siblings('.volume-control');

    // Hide these things if we are not in the autplay/automute state
    if(!isMuted){
      $muteIcon.hide();
      $unmuteIcon.hide();
    }

    recordEvent('Video','play',videoIndex);

    OO.Player.create(videoContainerDOMId, videoId, {
      onCreate: function(player) {
        var thisPlayer = player;

        // pause function
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
          $(document).off('Harmony.article.change',pausePlayer);
        };

        // Mute, unmute, and replay functions
        var mute = function(){
          player.setVolume(0.0);
        };

        var unmute = function(){
          player.setVolume(1.0);
          $replayIcon.fadeIn();
          // Lets record this event
          recordEvent('Video','unmute',videoIndex);
        };

        // Replay function
        var replay = function() {
          player.setPlayheadTime(0.0);
          // Lets record this event
          recordEvent('Video','replay',videoIndex);
        };

        var toggleMute = function(){
          if ($(this).hasClass('unmute-icon')) {
            $(this).removeClass('unmute-icon')
                   .addClass('mute-icon');
            unmute();
          } else {
            $(this).removeClass('mute-icon')
                   .addClass('unmute-icon');
            mute();
          }
        };

        // ------------------------------------------------------------
        // Attach to DOM elements for mute and replay
        // ------------------------------------------------------------

        $volumeControl.on('click',toggleMute);

        // Replay click event
        $replayIcon.on('click',replay);

        // Attach listener, so that video will pause if we go to another page
        $(document).on('Harmony.article.change',pausePlayer);

        // Hide the cover once the video starts playing
        // And mute the video
        var playbackStarted = function(){
          $overlay.addClass(overlayHiddenClass);
          if(isMuted){
            $volumeControl.fadeIn();
          }
        };

        player.mb.subscribe(OO.EVENTS.PLAY, 'myPage', playbackStarted);
        player.mb.subscribe(OO.EVENTS.INITIAL_PLAY, 'myPage',playbackStarted);

        // Hide controls
        player.mb.subscribe(OO.EVENTS.DESTROY, 'myPage',function(){
          $volumeControl.hide();
          $replayIcon.hide();
        });

        player.mb.subscribe(OO.EVENTS.PLAYBACK_READY, 'myPage',function(){
          // Alisha we ONLY do this on the landing page, right? Not for user clicks
          if(isMuted){
            mute();
          }
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

  // Attach event handlers
  $nextButton.on('click', showNextArticle);
  $prevButton.on('click', showPreviousArticle);
  $(document).on('keydown', { source: 'Keyboard'}, keyboardNavigationHandler);
  $('a.nav__social__link').click(trackSocialClick);

  setupNextAndPreviousArticle();
  displayApplicableArrows();

  // Call this to get going!
  console.log("calling article change");
  $(document).triggerHandler('Harmony.article.change', {activeArticle:$('article.active')});

  // Attach a listener to the video so we can still play the video after navigating
  // (or for all cases where autoplay does not apply)
  $('.video button').on('click',function(){
    rigUpVideoForContainer($('article.active .video-container'),false);
  });

})(jQuery);
(function($){
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

    $(document).triggerHandler('Harmony.event.track', {action:"Video", label:"Play",value: videoIndex});

    OO.Player.create(videoContainerDOMId, videoId, {
      onCreate: function(player) {
        var thisPlayer = player;

        // pause function
        var pausePlayer = function(){
          $(document).triggerHandler('Harmony.event.track', {action:"Video", label:"Pause",value: videoIndex});
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
          $(document).triggerHandler('Harmony.event.track', {action:"Video", label:"Unmute",value: videoIndex});
        };

        // Replay function
        var replay = function() {
          player.setPlayheadTime(0.0);
          $(document).triggerHandler('Harmony.event.track', {action:"Video", label:"Replay",value: videoIndex});
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

        // This is how to pause things
        $(document).on('Harmony.video.pause',pausePlayer);

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


  $(document).on('Harmony.video.playCurrent',function(){
    rigUpVideoForContainer($('article.active .video-container'));
  });

})(jQuery);
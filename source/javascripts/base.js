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
      $activeArticle.removeClass('active').addClass('hidden');
      $nextArticle.addClass('active').removeClass('hidden').removeClass('next');
      $activeArticle = $nextArticle;
      setupNextAndPreviousArticle();

      $(document).triggerHandler('Harmony.article.change', {activeArticle:$activeArticle, direction:"Next"});
    }
  };

  var showPreviousArticle = function(evnt){
    evnt.stopPropagation();
    evnt.preventDefault();

    if($previousArticle[0]){
      $activeArticle.removeClass('active').addClass('hidden');
      $previousArticle.addClass('active').removeClass('hidden').removeClass('previous');
      $activeArticle = $previousArticle;
      setupNextAndPreviousArticle();

      $(document).triggerHandler('Harmony.article.change',{activeArticle:$activeArticle, direction:"Previous"});
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

  // Attach event handlers
  $nextButton.on('click', showNextArticle);
  $prevButton.on('click', showPreviousArticle);
  $(document).on('keydown', { source: 'Keyboard'}, keyboardNavigationHandler);

  $(document).on('Harmony.article.next',     showNextArticle);
  $(document).on('Harmony.article.previous', showPreviousArticle);

  setupNextAndPreviousArticle();
  displayApplicableArrows();

  // Call this after the page is set up so everything is setup to get going!
  $(document).triggerHandler('Harmony.article.change', {activeArticle:$('article.active')});

  // Attach a listener to the video play button
  $('.video button').on('click',function(){
    $(document).triggerHandler('Harmony.video.playCurrent');
  });

})(jQuery);
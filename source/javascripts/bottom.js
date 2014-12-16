/*
 *= require_tree ./bottom
*/

var App = App || {};

App.Bottom = ( function ( $ ) {

  /**
   * Trigger unveil to lazy load images
   * @var string target, the class of images to lazy load
   * @var int pixels, how many pixels before the image it should load
   */
  var ladyLoadImages = function ( target, pixels ) {
    $( '.' + target ).unveil( pixels );
    return true;
  };

  /**
   * Let's get this started. Ha.
   */
  var init = function () {
    ladyLoadImages( 'lazy', 400 );
  };

  init();

} ) ( jQuery );

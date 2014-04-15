// (function($){
  
//   // OpenGraph for social sharing
//   var openGraphUpdate = function (eventObject,data) {
//     var url = data.url;

//     console.log("openGraphUpdate with URL", url, arguments);

//     // update the image URL
//     var activeImageURL = $('article.active .overlay').attr('data-image');
//     var metaOpenGraph = $('meta[property="og:image"]');
//     metaOpenGraph.content = activeImageURL;

//     // update the page URL
//     var activeURL = url;
//     var metaOpenGraphURL = $('meta[property="og:image"]');
//     metaOpenGraphURL.content = activeURL;
//   };


//   // This is something we want when a page changes
//   // Note 'Harmony.page.change' is triggered on load
//   $(document).on('Harmony.page.change',openGraphUpdate);

// })(jQuery);
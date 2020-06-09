function fitVideo(){
  var w = $(window).width() + 100,
    h = $(window).height() + 100;
  if (w/h > 16/9){
	  $('.video-adaptive').width(w);
	  $('.video-adaptive').height(w/16*9);
    $('#tv').css({'left': '0px'});
  } else {
	   $('.video-adaptive').width(h/9*16);
	  $('.video-adaptive').height(h);
    $('#tv').css({'left': -($('#tv').outerWidth()-w)/2});
  }
}
$(window).on('load resize', function(){
  fitVideo();
});	

$(".video-adaptive").get(0).play();

var elem = document.getElementById("html-video");
function openFullscreen() {
	var video = $("#html-video")[0]; 
	if (video.paused) {
	    video.play();
	};
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}
elem.addEventListener(
  'fullscreenchange',
  function(event) {
    if (!document.fullscreenElement) {
      elem.pause();
    }
  },
  false
);
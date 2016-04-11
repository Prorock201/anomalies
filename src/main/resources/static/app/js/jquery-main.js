$(document).ready(function() {

	var carouselOpener = $('.carousel-opener');
	carouselOpener.on('click', function (event) {
		$(this).parents('.carousel').toggleClass('hidden');
		event.preventDefault();
	});

	$('.cam-frame').mouseenter(function () {
		$(this).addClass('hover').parents('.cams-block').addClass('hovered');
	});
	$('.cam-frame').mouseleave(function () {
		var camFrame = $(this);
		camFrame.parents('.cams-block').removeClass('hovered');
		setTimeout(function () {
			camFrame.removeClass('hover');
		}, 200);
	});

});
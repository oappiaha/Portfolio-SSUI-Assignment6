// Most of the code was adapted from the APIs docs and examples,
// For example, any event binded to an event

function loadApp() {

 	$('#canvas').fadeIn(1000);

 	var flipbook = $('.book');
	if (flipbook.width()==0 || flipbook.height()==0) {
		setTimeout(loadApp, 10);
		return;
	}
	

	flipbook.turn({
			width: 922,
			height: 600,
			duration: 1500,
			acceleration: !isChrome(),
			gradients: true,
			autoCenter: true,
			elevation: 50,
			pages: 18,
			when: {
				turning: function(event, page, view) {
					
					var book = $(this),
					currentPage = book.turn('page'),
					pages = book.turn('pages');
			
					// These URI match the rules set in the turnjs' hash.js library

					Hash.go('page/' + page).update();
					disableControls(page);
				},

				turned: function(event, page, view) {
					disableControls(page);
					$(this).turn('center');
					if (page==1) { 
						$(this).turn('peel', 'br');
					}

				},

				missing: function (event, pages) {
					// Adds each page
					for (var i = 0; i < pages.length; i++)
						addPage(pages[i], $(this));

				}
			}

	});

	// Alllows the zooming feature to work on double clicls

	$('.book-view').zoom({
		flipbook: $('.book'),

		max: function() { 
			
			return largeMagazineWidth()/$('.book').width();

		}, 

		when: {

			swipeLeft: function() {
				$(this).zoom('flipbook').turn('next');
			},
			swipeRight: function() {			
				$(this).zoom('flipbook').turn('previous');
			},

			zoomIn: function () {
				$('.made').hide();
				$('.book').removeClass('animated').addClass('zoom-in');
				$('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');
				
				// Creates the "Press ESC TO exit" 
				if (!window.escTip && !$.isTouch) {
					escTip = true;

					$('<div />', {'class': 'exit-message'}).
					// Not working revisit
						html('<div>Press ESC to exit</div>').
							appendTo($('body')).
							delay(2000).
							animate({opacity:0}, 500, function() {
								$(this).remove();
							});
				}
			},
			zoomOut: function () {

				$('.exit-message').hide(); 
				$('.made').fadeIn();
				$('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');
				setTimeout(function(){
					$('.book').addClass('animated').removeClass('zoom-in');
					resizeViewport();
				}, 0);

			}
		}
	});

	// Zoom event

	if ($.isTouch)
		$('.book-view').bind('zoom.doubleTap', zoomTo);
	else
		$('.book-view').bind('zoom.tap', zoomTo);
	// Using arrow keys to turn the page

	$(document).keydown(function(e){

		var previous = 37
		var next = 39
		var esc = 27;

		switch (e.keyCode) {
			case previous:

				// left arrow
				$('.book').turn('previous');
				e.preventDefault();

			break;
			case next:

				//right arrow
				$('.book').turn('next');
				e.preventDefault();

			break;
			case esc:
				
				$('.book-view').zoom('zoomOut');	
				e.preventDefault();

			break;
		}
	});

	// Hashes through the images in the pages folder..turnjs forced this

	Hash.on('^page\/([0-9]*)$', {
		yep: function(path, parts) {
			var page = parts[1];

			if (page!==undefined) {
				if ($('.book').turn('is'))
					$('.book').turn('page', page);
			}

		},
		nop: function(path) {

			if ($('.book').turn('is'))
				$('.book').turn('page', 1);
		}
	});

	// Resizes window when you zoom in
	$(window).resize(function() {
		resizeViewport();
	}).bind('orientationchange', function() {
		resizeViewport();
	});

	if ($.isTouch) {
		$('.book').bind('touchstart', regionClick);
	} else {
		$('.book').click(regionClick);
	}

	// Events for the next button

	$('.next-button').bind($.mouseEvents.over, function() {	
		$(this).addClass('next-button-hover');
	}).bind($.mouseEvents.out, function() {	
		$(this).removeClass('next-button-hover');
	}).bind($.mouseEvents.down, function() {		
		$(this).addClass('next-button-down');
	}).bind($.mouseEvents.up, function() {	
		$(this).removeClass('next-button-down');
	}).click(function() {	
		$('.book').turn('next');

	});

	// Events for the next button
	
	$('.previous-button').bind($.mouseEvents.over, function() {
		$(this).addClass('previous-button-hover');

	}).bind($.mouseEvents.out, function() {	
		$(this).removeClass('previous-button-hover');

	}).bind($.mouseEvents.down, function() {	
		$(this).addClass('previous-button-down');

	}).bind($.mouseEvents.up, function() {	
		$(this).removeClass('previous-button-down');

	}).click(function() {
		
		$('.book').turn('previous');

	});
	resizeViewport();

	$('.book').addClass('animated');

}

// Creates the event for the zoom icon
 $('.zoom-icon').bind('mouseover', function() { 
 	
 	if ($(this).hasClass('zoom-icon-in'))
 		$(this).addClass('zoom-icon-in-hover');

 	if ($(this).hasClass('zoom-icon-out'))
 		$(this).addClass('zoom-icon-out-hover');
 
 }).bind('mouseout', function() { 
 	
 	 if ($(this).hasClass('zoom-icon-in'))
 		$(this).removeClass('zoom-icon-in-hover');
 	
 	if ($(this).hasClass('zoom-icon-out'))
 		$(this).removeClass('zoom-icon-out-hover');

 }).bind('click', function() {

 	if ($(this).hasClass('zoom-icon-in'))
 		$('.book-view').zoom('zoomIn');
 	else if ($(this).hasClass('zoom-icon-out'))	
		$('.book-view').zoom('zoomOut');

 });

 $('#canvas').hide();

yepnope({
	test: Modernizr.csstransforms,
	yep: ['../../resources/apis/turn/lib/turn.js'],
	nope: ['../../resources/apis/turn/lib/turn.html4.min.js'],
	both: ['../../resources/apis/turn/lib/magazine.js', '../../styles/books/garments.css','../../resources/apis/turn/lib/zoom.min.js'],
	complete: loadApp
});
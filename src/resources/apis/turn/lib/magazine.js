/*
 * Magazine sample
*/

function addPage(page, book) {

	var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');

		// Load the page
		loadPage(page, element);
	}

}

function loadPage(page, pageElement) {

	// Create an image element

	var img = $('<img />');

	img.mousedown(function(e) {
		e.preventDefault();
	});

	img.load(function() {
		
		// Set the size
		$(this).css({width: '100%', height: '100%'});

		// Add the image to the page after loaded

		$(this).appendTo(pageElement);

		// Remove the loader indicator
		
		pageElement.find('.loader').remove();
	});

	// Load the page

	img.attr('src', 'pages/' +  page + '.png');

	loadRegions(page, pageElement);

}

// Zoom in / Zoom out

function zoomTo(event) {

		setTimeout(function() {
			if ($('.book-view').data().regionClicked) {
				$('.book-view').data().regionClicked = false;
			} else {
				if ($('.book-view').zoom('value')==1) {
					$('.book-view').zoom('zoomIn', event);
				} else {
					$('.book-view').zoom('zoomOut');
				}
			}
		}, 1);

}



// Load regions

function loadRegions(page, element) {

	$.getJSON('pages/'+page+'-regions.json').
		done(function(data) {

			$.each(data, function(key, region) {
				addRegion(region, element);
			});
		});
}

// Add region

function addRegion(region, pageElement) {
	
	var reg = $('<div />', {'class': 'region  ' + region['class']}),
		options = $('.book').turn('options'),
		pageWidth = options.width/2,
		pageHeight = options.height;

	reg.css({
		top: Math.round(region.y/pageHeight*100)+'%',
		left: Math.round(region.x/pageWidth*100)+'%',
		width: Math.round(region.width/pageWidth*100)+'%',
		height: Math.round(region.height/pageHeight*100)+'%'
	}).attr('region-data', $.param(region.data||''));


	reg.appendTo(pageElement);
}

// Process click on a region

function regionClick(event) {

	var region = $(event.target);

	if (region.hasClass('region')) {

		$('.book-view').data().regionClicked = true;
		
		setTimeout(function() {
			$('.book-view').data().regionClicked = false;
		}, 100);
		
		var regionType = $.trim(region.attr('class').replace('region', ''));

		return processRegion(region, regionType);

	}

}

// Process the data of every region

function processRegion(region, regionType) {

	data = decodeParams(region.attr('region-data'));

	switch (regionType) {
		case 'link' :

			window.open(data.url);

		break;
		case 'zoom' :

			var regionOffset = region.offset(),
				viewportOffset = $('.book-view').offset(),
				pos = {
					x: regionOffset.left-viewportOffset.left,
					y: regionOffset.top-viewportOffset.top
				};

			$('.book-view').zoom('zoomIn', pos);

		break;
		case 'to-page' :

			$('.book').turn('page', data.page);

		break;
	}

}


// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

function disableControls(page) {
		if (page==1)
			$('.previous-button').hide();
		else
			$('.previous-button').show();
					
		if (page==$('.book').turn('pages'))
			$('.next-button').hide();
		else
			$('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {

	var width = $(window).width(),
		height = $(window).height(),
		options = $('.book').turn('options');

	$('.book').removeClass('animated');

	$('.book-view').css({
		width: width,
		height: height
	}).
	zoom('resize');


	if ($('.book').turn('zoom')==1) {
		var bound = calculateBound({
			width: options.width,
			height: options.height,
			boundWidth: Math.min(options.width, width),
			boundHeight: Math.min(options.height, height)
		});

		if (bound.width%2!==0)
			bound.width-=1;

			
		if (bound.width!=$('.book').width() || bound.height!=$('.book').height()) {

			$('.book').turn('size', bound.width, bound.height);

			if ($('.book').turn('page')==1)
				$('.book').turn('peel', 'br');

			$('.next-button').css({height: bound.height, backgroundPosition: '-38px '+(bound.height/2-32/2)+'px'});
			$('.previous-button').css({height: bound.height, backgroundPosition: '-4px '+(bound.height/2-32/2)+'px'});
		}

		$('.book').css({top: -bound.height/2, left: -bound.width/2});
	}

	var magazineOffset = $('.book').offset(),
		boundH = height - magazineOffset.top - $('.book').height(),
		marginTop = (boundH - $('.thumbnails > div').height()) / 2;

	if (marginTop<0) {
		$('.thumbnails').css({height:1});
	} else {
		$('.thumbnails').css({height: boundH});
		$('.thumbnails > div').css({marginTop: marginTop});
	}

	if (magazineOffset.top<$('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$('.book').addClass('animated');
	
}


// Number of views in a flipbook

function numberOfViews(book) {
	return book.turn('pages') / 2 + 1;
}

// Current view in a flipbook

function getViewNumber(book, page) {
	return parseInt((page || book.turn('page'))/2 + 1, 10);
}

function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}


// Width of the flipbook when zoomed in

function largeMagazineWidth() {
	
	return 2214;

}

// decode URL Parameters

function decodeParams(data) {

	var parts = data.split('&'), d, obj = {};

	for (var i =0; i<parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}

	return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {
	
	var bound = {width: d.width, height: d.height};

	if (bound.width>d.boundWidth || bound.height>d.boundHeight) {
		
		var rel = bound.width/bound.height;

		if (d.boundWidth/rel>d.boundHeight && d.boundHeight*rel<=d.boundWidth) {
			
			bound.width = Math.round(d.boundHeight*rel);
			bound.height = d.boundHeight;

		} else {
			
			bound.width = d.boundWidth;
			bound.height = Math.round(d.boundWidth/rel);
		
		}
	}
		
	return bound;
}
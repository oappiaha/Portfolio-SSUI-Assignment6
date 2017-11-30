
setTimeout(function(){
        $('.arrow').fadeIn(500);
        
    }, 2000);

setTimeout(function(){
        $('.left').fadeIn(500);
        
    }, 2000);



$(document).keypress(function(e){
	console.log(e.keyCode)
	if (e.keyCode == 32){
		$('#arrow').click();
		$('.arrow-image').hide()
	}
});

$('.arrow-image').hover(function () {
	$('#arrow').click();
	$('.arrow-image').hide();
});

$('.arrow-image2').hover(function () {
	$('#arrow2').click();
	$('.arrow-image2').hide();
});





$('.one').animsition({
	
	inClass:'zoom-in-sm',
	outClass: 'fade-out-left-sm',
	outDuration: 2000
	});


$('.two').animsition({
	// inClass: 'overlay-slide-in-top',
	// outClass: 'overlay-slide-out-top',
	// overlay : true,
	// overlayClass : 'animsition-overlay-slide',
	// overlayParentElement : 'body'
	inDuration: 2000,
	outDuration: 2000,
	inClass: 'fade-in-left-sm',
	outClass:'fade-out-left-sm'
});

$('.third-page').animsition({
	// inClass: 'overlay-slide-in-top',
	// outClass: 'overlay-slide-out-top',
	// overlay : true,
	// overlayClass : 'animsition-overlay-slide',
	// overlayParentElement : 'body'
	inDuration: 2000,
	outDuration: 2000,
	inClass: 'flip-in-x-fr',
	outClass:'flip-out-y-fr'
});

$('.fourth-page').animsition({
	// inClass: 'overlay-slide-in-top',
	// outClass: 'overlay-slide-out-top',
	// overlay : true,
	// overlayClass : 'animsition-overlay-slide',
	// overlayParentElement : 'body'
	inDuration: 2000,
	outDuration: 2000,
	inClass: 'fade-in-down-lg',
});

$('.fifth-page').animsition({
	// inClass: 'overlay-slide-in-top',
	// outClass: 'overlay-slide-out-top',
	// overlay : true,
	// overlayClass : 'animsition-overlay-slide',
	// overlayParentElement : 'body'
	inDuration: 1000,
	inClass: 'fade-in-right-sm',
});


$('.sixth-page').animsition({
	// inClass: 'overlay-slide-in-top',
	// outClass: 'overlay-slide-out-top',
	// overlay : true,
	// overlayClass : 'animsition-overlay-slide',
	// overlayParentElement : 'body'
	inDuration: 1000,
	inClass: 'fade-in-left-sm',
});


// inClass: 'flip-in-y',
//     outClass: 'flip-out-y',
//     inDuration: 1500,
//     outDuration: 800,
//     linkElement: '.animsition-link',
//     // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
//     loading: true,
//     loadingParentElement: 'body', //animsition wrapper element
//     loadingClass: 'animsition-loading',
//     loadingInner: '', // e.g '<img src="loading.svg" />'
//     timeout: false,
//     timeoutCountdown: 5000,
//     onLoadEvent: true,
//     browser: [ 'animation-duration', '-webkit-animation-duration'],
//     // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
//     // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
//     overlay : false,
//     overlayClass : 'animsition-overlay-slide',
//     overlayParentElement : 'body',
//     transition: function(url){ window.location.href = url; }

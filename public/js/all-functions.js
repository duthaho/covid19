$( document ).ready( function(){
	var targets = $( '[rel~=tooltip]' ),
		target	= false,
		tooltip = false,
		title	= '';

	targets.bind( 'mouseenter', function()
	{
		target	= $( this );
		tip		= target.attr( 'title' );
		tooltip	= $( '<div id="tooltip"></div>' );
		tooltipb	= $( '<div id="tooltip:before"></div>' );

		if( !tip || tip == '' )
			return false;

		target.removeAttr( 'title' );

		tooltip.css( 'opacity', 0 )
				.html( tip )
				.appendTo( 'body' );

		var init_tooltip = function()
		{
			if( $( window ).width() < tooltip.outerWidth() * 1.5 )
				tooltip.css( 'max-width', $( window ).width() / 2 );

			else
				tooltip.css( 'max-width', 140 );
				if(target.outerWidth()==0){
					var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2-15),
					pos_top	 = target.offset().top - tooltip.outerHeight() - 20;
				}else{
					var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
					pos_top	 = target.offset().top - tooltip.outerHeight() - 20;
				}

			if( pos_left < 0 )
			{
				/*pos_left = target.offset().left + target.outerWidth() / 2 - 20;
				tooltip.addClass( 'left' );*/
			}
			else
				tooltip.removeClass( 'left' );

			if( pos_left + tooltip.outerWidth() > $( window ).width() )
			{
				pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
				tooltip.addClass( 'right' );
			}
			else
			tooltip.removeClass( 'right' );

			if( pos_top < 0 )
			{
				var pos_top	 = target.offset().top + target.outerHeight();
				tooltip.addClass( 'top' );
			}
			else
				tooltip.removeClass( 'top' );

			tooltip.css( { left: pos_left, top: pos_top } )
				.animate( { top: '+=10', opacity: 1 }, 150 );
		};

		init_tooltip();
		$( window ).resize( init_tooltip );

		var remove_tooltip = function()
		{
			tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
			{
				$( this ).remove();
			});

			target.attr( 'title', tip );
		};

		target.bind( 'mouseleave', remove_tooltip );
		tooltip.bind( 'click', remove_tooltip );
	});
});

//Menu - detect position of the scroll in order to activate the menu child
//==================================================
$(document).ready(function() {

	//Bootstraping variable
	headerWrapper		= parseInt($('#header-wrapper').height());
	offsetTolerance	= 40;

	//Detecting user's scroll
	$(window).scroll(function() {

		//Check scroll position
		scrollPosition	= parseInt($(this).scrollTop());

		//Move trough each menu and check its position with scroll position then add selected-nav class
		$('.nav a').each(function() {

			thisHref				= $(this).attr('href');
			thisTruePosition	= parseInt($(thisHref).offset().top);
			thisPosition 		= thisTruePosition - headerWrapper - offsetTolerance;

			if(scrollPosition >= thisPosition) {
				$('.selected-nav').removeClass('selected-nav');
				$('.nav a[href='+ thisHref +']').parent('li').addClass('selected-nav');
			}
		});

		//If we're at the bottom of the page, move pointer to the last section
		bottomPage	= parseInt($(document).height()) - parseInt($(window).height());

		if(scrollPosition == bottomPage || scrollPosition >= bottomPage) {
			$('.selected-nav').removeClass('selected-nav');
			$('.nav a:last').parent('li').addClass('selected-nav');
		}
	});

});


//Timeline scroll effect
//==================================================
$(function() {

	var $sidescroll	= (function() {

			// the row elements
		var $rows			= $('#ss-container > div.ss-row'),
			// we will cache the inviewport rows and the outside viewport rows
			$rowsViewport, $rowsOutViewport,
			// navigation menu links
			$links			= $('#ss-nav > li > a'),
			$linksrel = $('a[rel~=scroll-link]'),
			// the window element
			$win			= $(window),
			// we will store the window sizes here
			winSize			= {},
			// used in the scroll setTimeout function
			anim			= false,
			// page scroll speed
			scollPageSpeed	= 2000 ,
			// page scroll easing
			scollPageEasing = 'easeInOutExpo',
			// perspective?
			hasPerspective	= false,

			perspective		= hasPerspective && Modernizr.csstransforms3d,
			// initialize function
			init			= function() {

				// get window sizes
				getWinSize();
				// initialize events
				initEvents();
				// define the inviewport selector
				defineViewport();
				// gets the elements that match the previous selector
				setViewportRows();
				// if perspective add css
				if( perspective ) {
					$rows.css({
						'-webkit-perspective'			: 600,
						'-webkit-perspective-origin'	: '50% 0%'
					});
				}
				// show the pointers for the inviewport rows

				$rowsViewport.find('div.time-dot').addClass('time-dot-show');

				$rowsViewport.find('div.time-dot-date').addClass('time-dot-show');

				// set positions for each row
				placeRows();

			},
			// defines a selector that gathers the row elems that are initially visible.
			// the element is visible if its top is less than the window's height.
			// these elements will not be affected when scrolling the page.
			defineViewport	= function() {

				$.extend( $.expr[':'], {

					inviewport	: function ( el ) {
						if ( $(el).offset().top < winSize.height ) {
							return true;
						}
						return false;
					}

				});

			},
			// checks which rows are initially visible
			setViewportRows	= function() {

				$rowsViewport 		= $rows.filter(':inviewport');
				$rowsOutViewport	= $rows.not( $rowsViewport )

			},
			// get window sizes
			getWinSize		= function() {

				winSize.width	= $win.width();
				winSize.height	= $win.height();

			},
			// initialize some events
			initEvents		= function() {

				$linksrel.on( 'click.Scrolling', function( event ) {

					// scroll to the element that has id = menu's href
					$('html, body').stop().animate({
						scrollTop: $( $(this).attr('href') ).offset().top-80
					}, scollPageSpeed, scollPageEasing );

					return false;

				});

				// navigation menu links.
				// scroll to the respective section.
				$links.on( 'click.Scrolling', function( event ) {

					// scroll to the element that has id = menu's href
					$('html, body').stop().animate({
						scrollTop: $( $(this).attr('href') ).offset().top
					}, scollPageSpeed, scollPageEasing );

					return false;

				});



				$(window).on({
					// on window resize we need to redefine which rows are initially visible (this ones we will not animate).
					'resize.Scrolling' : function( event ) {

						// get the window sizes again
						getWinSize();
						// redefine which rows are initially visible (:inviewport)
						setViewportRows();
						// remove pointers for every row
						$rows.find('div.time-dot').removeClass('div.time-dot');
						// show inviewport rows and respective pointers
						$rowsViewport.each( function() {

							$(this).find('div.ss-left')
								.css({ left   : '0%' })
								.end()
								.find('div.ss-right')
								.css({ right  : '0%' })
								.end()
								.find('div.ss-full')
								.css({ left  : '0%' })
								.end()
								.find('div.time-dot, div.time-dot-date')
								.addClass('time-dot-show');

						});

					},
					// when scrolling the page change the position of each row
					'scroll.Scrolling' : function( event ) {

						// set a timeout to avoid that the
						// placeRows function gets called on every scroll trigger
						if( anim ) return false;
						anim = true;
						setTimeout( function() {

							placeRows();
							anim = false;

						}, 10 );

					}
				});

			},
			// sets the position of the rows (left and right row elements).
			// Both of these elements will start with -50% for the left/right (not visible)
			// and this value should be 0% (final position) when the element is on the
			// center of the window.
			placeRows		= function() {

					// how much we scrolled so far
				var winscroll	= $win.scrollTop(),
					// the y value for the center of the screen
					winCenter	= winSize.height / 2 + winscroll;

				// for every row that is not inviewport
				$rowsOutViewport.each( function(i) {

					var $row	= $(this),
						// the left side element
						$rowL	= $row.find('div.ss-left'),
						// the right side element
						$rowR	= $row.find('div.ss-right'),
						$rowF	= $row.find('div.ss-full'),
						// top value
						rowT	= $row.offset().top;

					// hide the row if it is under the viewport
					if( rowT > winSize.height + winscroll ) {
						opa		= 0;

						if( perspective ) {

							$rowL.css({
								'-webkit-transform'	: 'translate3d(-75%, 0, 0) rotateY(-90deg) translate3d(-75%, 0, 0)',
								'opacity'			: 0
							});
							$rowF.css({
								'-webkit-transform'	: 'translate3d(-75%, 0, 0) rotateY(-90deg) translate3d(-75%, 0, 0)',
								'opacity'			: 0
							});
							$rowR.css({
								'-webkit-transform'	: 'translate3d(75%, 0, 0) rotateY(90deg) translate3d(75%, 0, 0)',
								'opacity'			: 0
							});

						}
						else {

							$rowL.css({ left 		: '-50%;' });
							$rowF.css({ left 		: '-50%' });
							$rowR.css({ right 		: '-50%' });
							/*$rowL.css({ display 	: 'none' });
							$rowR.css({ display 	: 'none' });*/

						}

					}
					// if not, the row should become visible (0% of left/right) as it gets closer to the center of the screen.
					else {

							// row's height
						var rowH	= $row.height(),
							// the value on each scrolling step will be proporcional to the distance from the center of the screen to its height
							factor 	= ( ( ( rowT + rowH / 2 ) - winCenter ) / ( winSize.height / 2 + rowH / 2 ) ),
							factoro = ( ( ( rowT - rowH / 2 ) - winCenter ) / ( winSize.height / 2 + rowH / 1 )/-0.3 ),
							// value for the left / right of each side of the row.

							// 0% is the limit
							val		= Math.max( factor * 50, 0 );
							opa		= Math.max( 0.1, factoro );

						if( val <= 0 ) {

							// when 0% is reached show the pointer for that row
							if( !$row.data('pointer') ) {

								$row.data( 'pointer', true );
								$row.find('div.time-dot-date').addClass('time-dot-show');
								$row.find('div.time-dot').addClass('time-dot-show');

							}

						}
						else {

							// the pointer should not be shown
							if( $row.data('pointer') ) {

								$row.data( 'pointer', false );
								$row.find('div.time-dot-date').removeClass('time-dot-show');
								$row.find('div.time-dot').removeClass('time-dot-show');

							}

						}

						// set calculated values
						if( perspective ) {

							var	t		= Math.max( factor * 75, 0 ),
								r		= Math.max( factor * 90, 0 ),
								o		= Math.min( Math.abs( factor - 1 ), 1 );

							$rowL.css({
								'-webkit-transform'	: 'translate3d(-' + t + '%, 0, 0) rotateY(-' + r + 'deg) translate3d(-' + t + '%, 0, 0)',
								'opacity'			: o
							});
							$rowF.css({
								'-webkit-transform'	: 'translate3d(-' + t + '%, 0, 0) rotateY(-' + r + 'deg) translate3d(-' + t + '%, 0, 0)',
								'opacity'			: o
							});
							$rowR.css({
								'-webkit-transform'	: 'translate3d(' + t + '%, 0, 0) rotateY(' + r + 'deg) translate3d(' + t + '%, 0, 0)',
								'opacity'			: o
							});

						}
						else {

							$rowL.css({ left 	: - val + '%' });
							/*$rowL.css({ display 	: '' });*/
							$rowL.css({ opacity 	:  opa  });
							$rowF.css({ left 	: - val + '%' });
							$rowF.css({ opacity 	:  opa  });
							$rowR.css({ right 	: - val + '%' });
							$rowR.css({ opacity 	:  opa  });
							/*$rowR.css({ display 	: '' });*/

						}

					}

				});

			};

		return { init : init };

	})();

	$sidescroll.init();
});

//Flexslider settings
//==================================================
$(document).ready(function(){
	$('#flexslider').flexslider({
		animation: "fade",
		controlNav: false,
		start: function(slider){
		$('body').removeClass('loading');
		}
	});
		$('#flexslider1').flexslider({
		animation: "fade",
		controlNav: false,
		start: function(slider){
		$('body').removeClass('loading');
		}
	});
	$('#flexslider-nav').flexslider({
		animation: "fade",
		controlNav: true,
		start: function(slider){
		$('body').removeClass('loading');
		}
	});
});



//Accordion settings
//==================================================
$(document).ready(function(){
$('#example1, #example2').accordion({
	speed: 400,
	canToggle: true

});

$(".loading").removeClass("loading");
});


//Img roll over effect settings
//==================================================
<!--[if !IE]>
$(document).ready(function(){
	var imgholder = document.getElementsByClassName("hover-effect");

	for(var i = 0, j=imgholder.length; i<j; i++){
		imgholder[i].addEventListener("mouseover", function(){
			var imgtoanimate = this.getElementsByTagName("img")[0];
			move(imgtoanimate)
			.rotate(10)
			.scale(2.0)
			.duration('1s')
			/*.then()
			.set('opacity', 0)
			.duration('0.3s')
			.scale(0.1)
			.pop()*/
			.end();
		});

		imgholder[i].addEventListener("mouseout", function(){
			var imgtoanimate = this.getElementsByTagName("img")[0];
			move(imgtoanimate)
			.rotate(0)
			.scale(1.0)
			.duration('1s')
			/*.then()
			.set('opacity', 0)
			.duration('0.3s')
			.scale(0.1)
			.pop()*/
			.end();
		});
	}
});
<!-- <![endif]>-->


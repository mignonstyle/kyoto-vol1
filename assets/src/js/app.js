var smoothScroll = require( '../../src/js/smooth-scroll.min.js' );
jQuery( function( $ ) {

	( function() {
		"use strict";
		$('.js-overlay-controller').on( 'click', function(){
			$('.js-overlay').fadeToggle( 200 );
		});
	} )();

	/**
	 * scroll
	 */
	( function() {
		smoothScroll.init();
	} )();

	/**
	 * pagetop
	 */
	( function() {
		var pagetop = $( '.pagetop' );
		var scroll  = 0;

		function set_fixed_top() {
			if ( scroll >= $( document ).height() - $( window ).height() ) {
				var top = $( window ).height() - pagetop.height() - 90;
				pagetop.css( 'top',  top );
			} else {
				var top = 120;
				var balloon = $( '.wapuu-pagetop__balloon' );
				if ( ! balloon.hasClass( 'fade-in' ) ) {
					top -= balloon.outerHeight();
				}
				pagetop.css( 'top',  top );
			}
		}

		$( window ).load( function() {
			set_fixed_top();
			pagetop.addClass( 'fade-in' );
		} );

		var timer = false;
		var start = 0;
		$( window ).scroll( function() {
			if ( timer !== false ) {
				clearTimeout( timer );
			}
			scroll = $( window ).scrollTop();
			var pagetop_top = parseInt( pagetop.css( 'top' ) );
			if ( scroll > start ) {
				// 下にスクロール中
				if ( pagetop_top + pagetop.height() >= 0 ) {
					pagetop.css( 'transition', 'none' );
					pagetop.css( 'top', pagetop_top - scroll + start );
				}
			} else if ( scroll < start ) {
				// 上にスクロール中
				if ( pagetop_top <= $( window ).height() ) {
					pagetop.css( 'transition', 'none' );
					pagetop.css( 'top', pagetop_top - scroll + start );
				}
			}
			start = $( window ).scrollTop();
			var timer = setTimeout( function() {
				if ( scroll == start ) {
					// 停止中
					pagetop.css( 'transition', '' );
					set_fixed_top();
				}
			}, 200 );
		} );

		$( window ).scroll( function() {
			scroll = $( window ).scrollTop();
			var balloon = $( '.wapuu-pagetop__balloon' );
			if ( scroll >= 700 ) {
				balloon.addClass( 'fade-in' );
			} else {
				balloon.removeClass( 'fade-in' );
			}
		} );
	} )();

	/**
	 * スマホフッター余白
	 */
	( function() {
		set_sp_footer_margin();

		$( window ).resize( function() {
			set_sp_footer_margin();
		} );

		function set_sp_footer_margin() {
			var gnav = $( '.global-nav' );

			if ( gnav.css( 'position' ) == 'fixed' ) {
				var margin = gnav.height()
			} else {
				var margin = 0;
			}
			$( 'body' ).css( 'padding-bottom', margin );
		}
	} )();

	/**
	 * タイムラインの各セッションを上下くっつける
	 */
	( function() {
		set_section_position();

		$( window ).resize( function() {
			set_section_position();
		} );

		function set_section_position() {
			var item = $( '.timeline__item' );
			if ( item.css( 'float' ) == 'none' ) {
				item.css( 'margin-top', '' );
				return;
			}

			item.each( function( i, e ) {
				if ( $( e ).hasClass( 'timeline__item--left' ) ) {
					var brother = $( e ).prev( '.timeline__item--left' );
					if ( !brother.length ) {
						var brother = $( e ).prev().prev( '.timeline__item--left' );
					}
				} else if ( $( e ).hasClass( 'timeline__item--right' ) ) {
					var brother = $( e ).prev( '.timeline__item--right' );
					if ( !brother.length ) {
						var brother = $( e ).prev().prev( '.timeline__item--right' );
					}
				}

				if ( brother.length ) {
					var item_position    = $( e ).position();
					var brother_position = brother.position();

					if ( typeof item_position !== 'undefined' && typeof brother_position !== 'undefined' ) {
						var item_top    = $( e ).position().top;
						var brother_top = brother.position().top;
						var brother_margin = parseInt( brother.css( 'margin-top' ) );

						$( e ).css( 'margin-top', brother_top - item_top + brother.outerHeight() + brother_margin  );
					}
				}
			} );
		}
	} )();
} );

/* ==============================================
	Bugherd Script for CMS project
=============================================== */
(function (d, t) {
  var bh = d.createElement(t), s = d.getElementsByTagName(t)[0];
  bh.type = 'text/javascript';
  bh.src = 'https://www.bugherd.com/sidebarv2.js?apikey=h10vep1oqpuntxrzgteacw';
  s.parentNode.insertBefore(bh, s);
})(document, 'script');

/* ==============================================
	Preload
=============================================== */
$(window).load(function () { // makes sure the whole site is loaded
  'use strict';
  $('.pulse ').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(250).fadeOut('slow'); // will fade out the white DIV that covers the website.
//	$('#intro_txt').addClass('animated fadeInDown'); // This is also fades in the background tint
})

/* ============================================== 
    Return to Top 
=============================================== */
$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});
$('#return-to-top').click(function () {      // When arrow is clicked
  $('body,html').animate({
    scrollTop: 0                       // Scroll to top of body
  }, 500);
});

/* ==============================================
	Animation on scroll
=============================================== */
new WOW().init();

/* ==============================================
	Fix Site Menu on scroll
=============================================== */
//var chromeNav = $("#chromeNav");
//
//chromeNav.on("scroll", function(e) {
//    
//  if (this.scrollTop > 147) {
//    chromeNav.addClass("fix-nav");
//  } else {
//    chromeNav.removeClass("fix-nav");
//  }
//  
//});

/* ==============================================
	Sticky nav
=============================================== */
$(window).scroll(function () {
  'use strict';
  if ($(this).scrollTop() > 147) {
    $('.header').addClass("sticky");
    $('.chromeNav').addClass("fix-nav");
  }
  else {
    $('.header').removeClass("sticky");
    $('.chromeNav').removeClass("fix-nav");

  }
});

jQuery(function ($) {
  "use strict";

  function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog"),
        offset = ($(window).height() - $dialog.height()) / 2,
        bottomMargin = parseInt($dialog.css('marginBottom'), 10);
    if (offset < bottomMargin) offset = bottomMargin;
    $dialog.css("margin-top", offset);
  }

  $('.modal').on('show.bs.modal', centerModal);

  $('.modal-popup .close-link').click(function (event) {
    event.preventDefault();
    $('.modal').modal('hide');
  });

  $(window).on("resize", function () {
    $('.modal:visible').each(centerModal);
  });
});


//<!-- Search-->	
$(function () {
  'use strict';
  $('a[href="#search"]').on('click', function (event) {
    event.preventDefault();
    $('#search').addClass('open');
    $('#search > form > input[type="search"]').focus();
  });
  $('#search, #search button.close').on('click keyup', function (event) {
    if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
      $(this).removeClass('open');
    }
  });
});

$(function () {
  'use strict';
  $('.video_pop').magnificPopup({type: 'iframe'});
  /* video modal*/
  /* Gallery images modal*/
  $('.magnific-gallery').each(function () {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {enabled: true},
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeOpen: function () {
          // just a hack that adds mfp-anim class to markup
          this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
          this.st.mainClass = this.st.el.attr('data-effect');
        }
      },
      closeOnContentClick: true,
      midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
  });
});

//<!-- testimonial carousel -->	
$(document).ready(function () {
  'use strict';
  $('#quote-carousel').carousel({
    pause: true,
    interval: 10000
  });
});

/* ==============================================
	Common
=============================================== */

//<!-- Tooltip -->	
$('.tooltip-1').tooltip({html: true});

//accordion
function toggleChevron(e) {
  'use strict';
  $(e.target)
      .prev('.panel-heading')
      .find("i.indicator")
      .toggleClass('icon_plus_alt2 icon_minus_alt2');
}

$('#accordion').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);

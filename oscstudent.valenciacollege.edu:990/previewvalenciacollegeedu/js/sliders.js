	$(document).ready(function () {
	  'use strict';
	  $('#layerslider').layerSlider({
	    autoStart: true,
	    responsive: true,
	    responsiveUnder: 1280,
	    layersContainer: 1170,
	    skinsPath: '/layerslider/skins/'
	    // Please make sure that you didn't forget to add a comma to the line endings
	    // except the last line!
	  });
	});
	
		new CBPFWTabs(document.getElementById('tabs'));
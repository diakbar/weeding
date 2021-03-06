/*	Javascript code for all elements
/*----------------------------------------------------*/
$(document).ready(function() {
	initMaps();
});


$(document).ready(function() {
    count(".coming-soon");           
});


/* -------- Owl Carousel MTCH -------- */
$(".quote-carousel").owlCarousel({
	slideSpeed : 300,
	autoPlay : true,
	paginationSpeed : 400,
	singleItem : true,		
});
// End Owl Carousel


/* -------- Counter Up -------- */
$('.counter').counterUp({
	delay: 10,
	time: 1000
});
// End Counter Up

// Compares Date Function
var dates={convert:function(t){return t.constructor===Date?t:t.constructor===Array?new Date(t[0],t[1],t[2]):t.constructor===Number?new Date(t):t.constructor===String?new Date(t):"object"==typeof t?new Date(t.year,t.month,t.date):NaN},compare:function(t,e){return isFinite(t=this.convert(t).valueOf())&&isFinite(e=this.convert(e).valueOf())?(t>e)-(e>t):NaN},inRange:function(t,e,n){return isFinite(t=this.convert(t).valueOf())&&isFinite(e=this.convert(e).valueOf())&&isFinite(n=this.convert(n).valueOf())?t>=e&&n>=t:NaN}};

/*	Count Down
/*---------------------------------------------------- MTCH*/
function count(elem){
    var $e = $(elem);
	if($e.length==0){
		return 0;
	};

	//CountDown
    var dateOfBeginning = new Date(),
        dateOfEnd = $e.closest('[data-end-date]').attr('data-end-date') || new Date((new Date()).getTime() + 3*30*24*3600*1000);
    compareResult = dates.compare(dateOfEnd,dateOfBeginning)

    if(compareResult === -1){
      // On Hari Nikah 2016-12-18 
      countUp(dateOfBeginning, dateOfEnd);
      document.getElementById("wording-countdown").innerHTML = "Live Stream The Wedding - 18 December 2016";
      document.getElementById("button-rsvp").innerHTML = "LiveStream";
      document.getElementById("rsvp-now").remove();
      document.getElementById("hitung-mundur-jam").remove();
      document.getElementById("headernya").remove();
    }
    else{
      // Before Hari Nikah 2016-12-18
      countDown(dateOfBeginning, dateOfEnd);
      document.getElementById("streaming-youtube").remove(); // remove id youtube, save it for later :)
      document.getElementById("embed-responsive-16by9").remove(); // remove id youtube, save it for later :)
      // var e_youtubestream = document.getElementById('streaming-youtube');
      // elem.parentNode.removeChild(e_youtubestream);

    }


}


/* -------- Isotope Filtering -------- */
var $container = $('.isotope-gallery-container');
var $filter = $('.filter');
$(window).load(function () {
    // Initialize Isotope
    $container.isotope({
        itemSelector: '.gallery-item-wrapper'
    });
    $('.filter a').click(function () {
        var selector = $(this).attr('data-filter');
        var $iso_container = $(this).closest('.content-block,body').find('.isotope-gallery-container');
        $iso_container.isotope({ filter: selector });

        var $iso_filter = $(this).closest('.filter');
        $iso_filter.find('a').parent().removeClass('active');
        $(this).parent().addClass('active');
        return false;
    });
  /*  $filter.find('a').click(function () {
        var selector = $(this).attr('data-filter');
        $filter.find('a').parent().removeClass('active');
        $(this).parent().addClass('active');
    });*/
});
$(window).smartresize(function () {
    $container.isotope('reLayout');
});
// End Isotope Filtering


/* -------- Gallery Popup -------- */
$(document).ready(function(){
	$('.gallery-zoom').magnificPopup({ 
		type: 'image'
		// other options
	});
});
// End Gallery Popup


/* -------- Google Map -------- MTCH */
var map;
var infowindow;
function initMap(elem) {
    var lokasinya = {lat: -7.336694, lng: 112.715449};
    var $e = $(elem);
	if($e.length==0){
		return 0;
	};

    var lat = parseFloat($e.attr('data-map-lat') || 51.5111507);
    var long = parseFloat($e.attr('data-map-long') || -0.1239844);
    var zoom = parseInt($e.attr('data-map-zoom') || 15);

    var marker_image = $e.attr('data-marker-image') || 'images/map-pin.png';

	//Map start init
    var mapOptions = {
        center: new google.maps.LatLng(lat, long),
        zoom: zoom,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
        },
        disableDoubleClickZoom: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
        },
        scaleControl: true,
        scrollwheel: false,
        streetViewControl: true,
        draggable : false,
        overviewMapControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		//styles: [{stylers:[{saturation:-100},{gamma:1}]},{elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"water",stylers:[{visibility:"on"},{saturation:50},{gamma:0},{hue:"#50a5d1"}]},{featureType:"administrative.neighborhood",elementType:"labels.text.fill",stylers:[{color:"#333333"}]},{featureType:"road.local",elementType:"labels.text",stylers:[{weight:0.5},{color:"#333333"}]},{featureType:"transit.station",elementType:"labels.icon",stylers:[{gamma:1},{saturation:0}]}]
		}
    
    var contentString = '<div class="info-window">' +
            '<h3><center>Resepsi+Akad Nikah</center></h3>' +
            '<div class="info-content">' +
            '<center><p>Masjid Nasional Al - Akbar Surabaya</p></center>' +
            '<center><a href="https://maps.google.com?saddr=Current+Location&daddr=masjid+al+akbar+surabaya" style="font-size:20px">GET DIRECTION</a></center>'+
            '</div>' +
            '</div>'

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        position: (-7.336694, 112.715449),
        maxWidth: 400
    });

    map = new google.maps.Map($e.get(0), mapOptions);
    var marker_acara = new google.maps.Marker({
    	icon: marker_image,
        map: map,
        animation:google.maps.Animation.DROP,
        position: map.getCenter() 
    });

    infowindow.open(map, marker_acara);
        marker_acara.addListener('click', function () {
            infowindow.open(map, marker_acara);
        });

// Nearby Function
    // infowindowNearby = new google.maps.InfoWindow();
// 
    // var service = new google.maps.places.PlacesService(map);
    // service.nearbySearch({
    // location: lokasinya,
    // radius: 500,
    // types: ['room']
  // }, callback);
}

function initMaps() {
    $('.map').each(function(i, e) {
        initMap(e);
    })

}


// function callback(results, status) {
  // if (status === google.maps.places.PlacesServiceStatus.OK) {
    // for (var i = 0; i < results.length; i++) {
      // createMarker(results[i]);
    // }
  // }
// 
// }
// 
// function createMarker(place) {
  // var placeLoc = place.geometry.location;
  // var marker2 = new google.maps.Marker({
    // map: map,
    // position: place.geometry.location
  // });
  // var request = { reference: place.reference };
  // google.maps.event.addListener(marker2, 'click', function() {
    // infowindowNearby.setContent(place.name);
    // infowindowNearby.open(map, this);
  // });
// }
//end Google Map



/* -------- Header 1 Nav -------- */
$(".headroom").headroom({
});

/* Soft scroll */
$(function() {
    $('.soft-scroll a[href^="#"], a[href^="#"].soft-scroll').bind('click', function(event) {
        var $anchor = $(this);
        var href = $anchor.attr('href');
        try {
            var elem = $(href);
            if(elem.length) {
                $('html, body').stop().animate({
                    scrollTop: elem.offset().top
                }, 1000);

                event.preventDefault();
            }
        }
        catch(err) {}
    });
});

    
/* -------- Header 3 Nav -------- MTCH */

function initHeader3() {
    $('.nav-slide-btn').click(function() {
        $('.pull').slideToggle();
    });

    $('#nav-toggle').click(function(e) {
        $(this).toggleClass('active');
        e.preventDefault();
    })
}
$(function() {
    initHeader3();
});


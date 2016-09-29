
// image magnify function
$(document).ready(function() {

	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
		
	});

	$('.image-popup-fit-width').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		}
	});

	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

});


// fireflies
'use strict';

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var MAX_FLIES = 30;
var FLY_XSPEED_RANGE = [-1, 1];
var FLY_YSPEED_RANGE = [-0.5, 0.5];
var FLY_SIZE_RANGE = [1, 5];
var FLY_LIFESPAN_RANGE = [75, 150];

var flies = [];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Fly(options) {
  if (!options) { options = {}; }

  this.x = options.x || randomRange(0, canvas.width);
  this.y = options.y || randomRange(0, canvas.height);
  this.xSpeed = options.xSpeed || randomRange(FLY_XSPEED_RANGE[0], FLY_XSPEED_RANGE[1]);
  this.ySpeed = options.ySpeed || randomRange(FLY_YSPEED_RANGE[0], FLY_YSPEED_RANGE[1]);
  this.size = options.size || randomRange(FLY_SIZE_RANGE[0], FLY_SIZE_RANGE[1]);
  this.lifeSpan = options.lifeSpan || randomRange(FLY_LIFESPAN_RANGE[0], FLY_LIFESPAN_RANGE[1]);
  this.age = 0;

  this.colors = options.colors || {
    red: 207,
    green: 255,
    blue: 4,
    alpha: 0
  };
}

function fitToScreen(element) {
  element.width = window.innerWidth;
  element.height = window.innerHeight;
}

function clearScreen() {
  ctx.beginPath();
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}

function createFlies() {
  if (flies.length !== MAX_FLIES) {
    flies.push(new Fly());
  }
}

function moveFlies() {
  flies.forEach(function(fly) {
    fly.x += fly.xSpeed;
    fly.y += fly.ySpeed;
    fly.age++;

    if (fly.age < fly.lifeSpan / 2) {
      fly.colors.alpha += 1 / (fly.lifeSpan / 2);

      if (fly.colors.alpha > 1) { fly.colors.alpha = 1; }
    } else {
      fly.colors.alpha -= 1 / (fly.lifeSpan / 2);

      if (fly.colors.alpha < 0) { fly.colors.alpha = 0; }
    }
  });
}

function removeFlies() {
  var i = flies.length;

  while (i--) {
    var fly = flies[i];

    if (fly.age >= fly.lifeSpan) {
      flies.splice(i, 1);
    }
  }
}

function drawFlies() {
  flies.forEach(function(fly) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(' + fly.colors.red + ', ' + fly.colors.green + ', ' + fly.colors.blue + ', ' + fly.colors.alpha + ')';
    ctx.arc(
      fly.x,
      fly.y,
      fly.size,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
  });
}

function render() {
  clearScreen();
  createFlies();
  moveFlies();
  removeFlies();
  drawFlies();
}

window.addEventListener('resize', function() {
  fitToScreen(canvas);
});

document.querySelector('header').appendChild(canvas);
fitToScreen(canvas);

(function animationLoop() {
  window.requestAnimationFrame(animationLoop);
  render();
})();

// Typing Animation

String.prototype.rightChars = function(n){
  if (n <= 0) {
    return "";
  }
  else if (n > this.length) {
    return this;
  }
  else {
    return this.substring(this.length, this.length - n);
  }
};

(function($) {
  /*
  var
    options = {
      highlightSpeed    : 20,
      typeSpeed         : 20,
      clearDelay        : 500,
      typeDelay         : 20,
      clearOnHighlight  : true,
      typerDataAttr     : 'data-typer-targets',
      typerInterval     : 20
    },
 */
  var options = {
  spanWithColor    : '#000, #fff',
  highlightSpeed    : 20,
  typeSpeed         : 30,
  clearDelay        : 1500,
  typeDelay         : 10,
  clearOnHighlight  : true,
  typerDataAttr     : 'data-typer-targets',
  typerInterval     : 1000
 },
    highlight,
    clearText,
    backspace,
    type,
    spanWithColor,
    clearDelay,
    typeDelay,
    clearData,
    isNumber,
    typeWithAttribute,
    getHighlightInterval,
    getTypeInterval,
    typerInterval;

  spanWithColor = function(color, backgroundColor) {
    if (color === 'rgba(0, 0, 0, 0)') {
      color = 'rgb(255, 255, 255)';
    }

    return $('<span></span>')
      .css('color', color)
      .css('background-color', backgroundColor);
  };

  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  clearData = function ($e) {
    $e.removeData([
      'typePosition',
      'highlightPosition',
      'leftStop',
      'rightStop',
      'primaryColor',
      'backgroundColor',
      'text',
      'typing'
    ]);
  };

  type = function ($e) {
    var
      // position = $e.data('typePosition'),
      text = $e.data('text'),
      oldLeft = $e.data('oldLeft'),
      oldRight = $e.data('oldRight');

    // if (!isNumber(position)) {
      // position = $e.data('leftStop');
    // }

    if (!text || text.length === 0) {
      clearData($e);
      return;
    }


    $e.text(
      oldLeft +
      text.charAt(0) +
      oldRight
    ).data({
      oldLeft: oldLeft + text.charAt(0),
      text: text.substring(1)
    });

    // $e.text($e.text() + text.substring(position, position + 1));

    // $e.data('typePosition', position + 1);

    setTimeout(function () {
      type($e);
    }, getTypeInterval());
  };

  clearText = function ($e) {
    $e.find('span').remove();

    setTimeout(function () {
      type($e);
    }, typeDelay());
  };

  highlight = function ($e) {
    var
      position = $e.data('highlightPosition'),
      leftText,
      highlightedText,
      rightText;

    if (!isNumber(position)) {
      position = $e.data('rightStop') + 1;
    }

    if (position <= $e.data('leftStop')) {
      setTimeout(function () {
        clearText($e);
      }, clearDelay());
      return;
    }

    leftText = $e.text().substring(0, position - 1);
    highlightedText = $e.text().substring(position - 1, $e.data('rightStop') + 1);
    rightText = $e.text().substring($e.data('rightStop') + 1);

    $e.html(leftText)
      .append(
        spanWithColor(
            $e.data('backgroundColor'),
            $e.data('primaryColor')
          )
          .append(highlightedText)
      )
      .append(rightText);

    $e.data('highlightPosition', position - 1);

    setTimeout(function () {
      return highlight($e);
    }, getHighlightInterval());
  };

  typeWithAttribute = function ($e) {
    var targets;

    if ($e.data('typing')) {
      return;
    }

    try {
      targets = JSON.parse($e.attr($.typer.options.typerDataAttr)).targets;
    } catch (e) {}

    if (typeof targets === "undefined") {
      targets = $.map($e.attr($.typer.options.typerDataAttr).split(','), function (e) {
        return $.trim(e);
      });
    }

    $e.typeTo(targets[Math.floor(Math.random()*targets.length)]);
  };

  // Expose our options to the world.
  $.typer = (function () {
    return { options: options };
  })();

  $.extend($.typer, {
    options: options
  });

  //-- Methods to attach to jQuery sets

  $.fn.typer = function() {
    var $elements = $(this);

    return $elements.each(function () {
      var $e = $(this);

      if (typeof $e.attr($.typer.options.typerDataAttr) === "undefined") {
        return;
      }

      typeWithAttribute($e);
      setInterval(function () {
        typeWithAttribute($e);
      }, typerInterval());
    });
  };

  $.fn.typeTo = function (newString) {
    var
      $e = $(this),
      currentText = $e.text(),
      i = 0,
      j = 0;

    if (currentText === newString) {
      console.log("Our strings our equal, nothing to type");
      return $e;
    }

    if (currentText !== $e.html()) {
      console.error("Typer does not work on elements with child elements.");
      return $e;
    }

    $e.data('typing', true);

    while (currentText.charAt(i) === newString.charAt(i)) {
      i++;
    }

    while (currentText.rightChars(j) === newString.rightChars(j)) {
      j++;
    }

    newString = newString.substring(i, newString.length - j + 1);

    $e.data({
      oldLeft: currentText.substring(0, i),
      oldRight: currentText.rightChars(j - 1),
      leftStop: i,
      rightStop: currentText.length - j,
      primaryColor: $e.css('color'),
      backgroundColor: $e.css('background-color'),
      text: newString
    });

    highlight($e);

    return $e;
  };

  //-- Helper methods. These can one day be customized further to include things like ranges of delays.

  getHighlightInterval = function () {
    return $.typer.options.highlightSpeed;
  };

  getTypeInterval = function () {
    return $.typer.options.typeSpeed;
  },

  clearDelay = function () {
    return $.typer.options.clearDelay;
  },

  typeDelay = function () {
    return $.typer.options.typeDelay;
  };

  typerInterval = function () {
    return $.typer.options.typerInterval;
  };
})(jQuery);





$('.type-once').typeTo("Testing Typer.js jQuery Plugin with a 1 time text string.");


$('[data-typer-targets]').typer({
  highlightSpeed    : 2660,
  typeSpeed         : 8600,
  clearDelay        : 6500,
  typeDelay         : 6200,
  clearOnHighlight  : false,
  typerDataAttr     : 'data-typer-targets',
  typerInterval     : 2000
});
$(function () {
  var $fotorama = $('#fotorama');

  if (!$fotorama[0] || !window.Photos) return;

  var $window = $(window),
      $body = $('body'),
      pixelRatio = window.devicePixelRatio || 1,
      width = Math.round(Math.min(window.innerWidth * pixelRatio, 1280) / 160) * 160,
      ratio = 1.5,
      maxRatio = 2.5,
      thumbmargin = 2,
      _thumbSize = 48 + 8,
      maxThumbSize = _thumbSize * pixelRatio,
      _hash = location.hash.replace(/^#/, ''),
      _hashKey = (_hash.split('__'))[0],
      _keys = _.keys(Photos),
      albumKey = Photos[_hashKey] ? _hashKey : _keys[_.random(_keys.length - 1)],
      album = Photos[albumKey];

  var data = $.map(album.uuids, function (uuid) {
    var full = 'http://i.fotorama.io/' + uuid + '/';
    return {
      full: full,
      img: full + '-/stretch/off/-/resize/' + width + 'x/',
      thumb: full + '-/scale_crop/' + (maxThumbSize * ratio) + 'x' + maxThumbSize + '/center/',
      id: albumKey + '__' + uuid
    }
  });

  console.log('# Fotorama events');

  $fotorama
      .on('fotorama:ready '            // Fotorama is fully ready, dimensions are set
          + 'fotorama:show '           // Start of transition to the new frame
          + 'fotorama:showend '        // End of the show transition
          + 'fotorama:load '           // Stage image of some frame is loaded
          + 'fotorama:error '          // Stage image of some frame is broken
          //+ 'fotorama:startautoplay ' // Slideshow is started
          //+ 'fotorama:stopautoplay '  // Slideshow is stopped
          + 'fotorama:fullscreenenter ' // Fotorama is fullscreened
          + 'fotorama:fullscreenexit '  // Fotorama is unfullscreened
          //+ 'fotorama:loadvideo '    // Video iframe is loaded
          //+ 'fotorama:unloadvideo'   // Video iframe is removed
          , function (e, fotorama, extra) {
            console.log('## ' + e.type);

            if (!extra || !extra.src) {
              console.log('active image: ' + fotorama.activeFrame.img);
            }

            if (extra) {
              extra.time && console.log('transition duration: ' + Math.round(extra.time) + 'ms');
              extra.src && console.log((e.type === 'fotorama:load' ? 'loaded' : 'broken') + ' image: ' + extra.src);
            }

            console.log('');
          }
      )
      .fotorama({
        data: data,
        clicktransition: 'dissolve',
        width: '100%',
        ratio: ratio,
        hash: true,
        maxheight: '100%',
        nav: 'thumbs',
        margin: 2,
        shuffle: true,
        thumbmargin: thumbmargin,
        /*allowfullscreen: 'native',*/
        keyboard: {space: true},
        shadows: false,
        fit: 'cover'
      });

  $('#photos-by').html('Photos <a href="' + album.by.href +'" class="js-analytics-click" data-action="outbound">by ' + album.by.title + '</a>');

  var fotorama = $fotorama.data('fotorama'),
      fotoramaHeight,
      innerWidth,
      innerHeight;
  var lastThumbSize, lastMinHeight;
  var $sayHi = $('#say-hi'),
      $sayHiAnchor = $('#say-hi-anchor'),
      sayHiVisible,
      time = 300;

  $window.on('resize', function () {
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;

    fotoramaHeight = $fotorama.offset().top + $fotorama.height();

    var thumbSize = _thumbSize,
        options = {};

    if (innerWidth < 520) {
      thumbSize = _thumbSize - 8 * 2;
    } else if (innerWidth < 640) {
      thumbSize = _thumbSize - 8;
    }

    var thumbWidth = thumbSize * ratio,
        minHeight = Math.round(innerWidth / maxRatio);

    if (thumbSize !== lastThumbSize) {
      console.log('Resize thumbs to ' + thumbWidth + '×' + thumbSize + 'px');
      console.log('');

      $.extend(options, {thumbwidth: thumbWidth, thumbheight: thumbSize});
      $sayHi.css({bottom: thumbSize + thumbmargin * 2});
      lastThumbSize = thumbSize;
    }

    if (minHeight !== lastMinHeight) {
      console.log('Set min height to ' + minHeight + 'px');
      console.log('');

      $.extend(options, {minheight: minHeight});

      lastMinHeight = minHeight;
    }

    fotorama.setOptions(options);

    $window.scroll();
  }).on('scroll', function () {
    var scrollTop = $window.scrollTop();

    if (scrollTop + innerHeight < fotoramaHeight + 64) {
      if (sayHiVisible || sayHiVisible === false) return;

      $sayHi.stop().show().fadeTo(time, 1);

      sayHiVisible = true;
    } else if (sayHiVisible) {

      $sayHi.stop().fadeTo(time, 0, function () {
        $sayHi.hide();
      });

      sayHiVisible = false;
    }

  }).resize();

  $sayHi.on('click', 'a', function (e) {
    e.preventDefault();
    $body.animate({scrollTop: $sayHiAnchor.offset().top - 10}, time);
  });
});
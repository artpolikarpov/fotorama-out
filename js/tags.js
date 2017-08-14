// $(function () {
//
//   var $window = $(window);
//
//   function setHash (hash) {
// //    var scrollTop = $window.scrollTop(),
// //        scrollLeft = $window.scrollLeft();
//
//     location.replace(location.protocol
//         + '//'
//         + location.host
//         + location.pathname.replace(/^\/?/, '/')
//         + location.search
//         + '#' + hash);
//
// //    $window
// //        .scrollTop(scrollTop)
// //        .scrollLeft(scrollLeft);
//
//     $('li[data-tag="' + hash + '"').addClass('active')
//         .siblings().removeClass('active');
//   }
//
//   $('.js-tags').each(function () {
//     var $this = $(this),
//         $items = $($this.data('selector')),
//         tags = {};
//
//     function showTag (tag, options) {
//       if (tag && !tags[tag]) return;
//
//       $this.toggleClass('tags-all', !tag);
//       //$items.slideToggle(!tag);
//
//       options = _.extend({
//         time: 300
//       }, options);
//
//       var _$items = $();
//
//       if (tag) {
//         $.each(tags, function (key, content) {
//           if (tag === key) {
//             $.each(content.items, function (i, $item) {
//               _$items = _$items.add($item.stop().slideDown(options.time));
//             });
//           }
//         });
//
//         $items.not(_$items).stop().slideUp(options.time);
//       } else {
//         $items.stop().slideDown(options.time);
//       }
//
//       setHash(tag);
//     }
//
//     $items.each(function () {
//       var $item = $(this);
//
//       $.each($item.data('tags').split(','), function (i, tag) {
//         tags[tag] = tags[tag] || {
//           items: []
//         };
//
//         tags[tag].items.push($item);
//       });
//     });
//
//     var sortedTags = $.map(tags, function (content, tag) {
//       return {title: tag, items: content.items};
//     });
//
//     sortedTags.sort(function (a, b) {
//       return a.items.length < b.items.length;
//     });
//
//     sortedTags.push({
//       title: ''
//     });
//
//     $.each(sortedTags, function (i, tag) {
//       var $li = $('<li></li>')
//               .attr({'data-tag': tag.title}),
//           $a = $('<a class="dashed"></a>')
//               .attr({href: '#' + tag.title})
//               .text(tag.title),
//           $small = $('<small></small>')
//               .text(tag.items ? ' ' + tag.items.length : '');
//
//       $a.on('click', function (e) {
//         e.preventDefault();
//
//         showTag(tag.title);
//       });
//
//       $this.append($li.append($a).append($small));
//     });
//
//
//     showTag(location.hash.replace(/^#?/, ''), {time: 0});
//
//   });
//
// });
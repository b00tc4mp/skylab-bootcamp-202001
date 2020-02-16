'use strict';

function googl(query, callback) {
    if (typeof query !== 'string') throw new TypeError(query + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call('https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=' + query, function (response) {
        if (response.status === 200) {
            var doc = new DOMParser().parseFromString(response.content, 'text/html');

            var items = doc.querySelectorAll('div.g');

            var results = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                var title = item.querySelector('h3.LC20lb');

                if (title) {
                    var result = {};

                    result.title = title.innerText.trim();

                    var rating = item.querySelector('.slp.f');

                    if (rating)
                        result.rating = rating.innerText.trim();

                    var description = item.querySelector('span.st');

                    if (description)
                        result.description = description.innerText.trim();

                    var link = item.querySelector('.rc>.r>a');

                    if (link)
                        result.link = link.href.trim();

                    results.push(result);
                }

            }

            callback(results);
        }
    });
}
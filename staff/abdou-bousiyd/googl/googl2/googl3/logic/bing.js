function bing(query, callback) {
    search('https://www.bing.com/search?q=' + query, 'li.b_algo', 'h2>a', 'h2>a', 'p', callback);
}
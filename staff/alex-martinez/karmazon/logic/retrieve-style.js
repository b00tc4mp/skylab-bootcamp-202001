function retrieveStyle(id, callback) {

    if (typeof id !== 'string') throw new TypeError(id + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call(`https://skylabcoders.herokuapp.com/api/hotwheels/styles/${id}`, undefined, (error, response) => {
        if (response instanceof Error) return callback(response);

        if (response.status === 200) {
            var styles = JSON.parse(response.content);

            callback(styles);
        }
    });
}
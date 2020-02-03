'use strict';

function Results(props) {
    var list = document.createElement('ul');
    list.classList.add('results');

    props.results.forEach(function (result) {
        // TODO var item = new Item(...)

        var item = new Item(result, props.onClick);

        list.append(item.container);
        
    });

    return list;
}

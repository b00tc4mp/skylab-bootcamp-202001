class Results extends Component {
    constructor({results, onItemClick}) {
        super(document.createElement('ul'))

        const list = this.container

        list.classList.add('results')

        results.forEach(result => {
            const item = new Item({
                result, 
                onClick: onItemClick
            })
        
            list.append(item.container)
        })
        return list
    }
}
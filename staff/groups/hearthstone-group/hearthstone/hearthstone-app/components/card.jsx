function Card({ cardInfo: { id, name, image, isFav, rating, rateCount, rateAvg } , onClick, onWL, onDeck, onRating}) {
    return <li className = "results__card">
        <h2>{name}</h2>

       { image && <img src={image}
            onClick={() => onClick(id)} />}

       { !image && <img src="https://legaldbol.com/wp-content/uploads/2019/03/48-Free-Printable-Card-Template-Hearthstone-in-Photoshop-by-Card-Template-Hearthstone.jpg"
            onClick={() => onClick(id)} />}

        <div>
            <span onClick={event => {
                event.preventDefault()
                const rating = [id, 1]
                onRating(rating)
            }}><i className="fas fa-star"></i></span>

            <span  onClick={event => {
                event.preventDefault()
                const rating = [id, 2]
                onRating(rating)
            }}><i className="fas fa-star"></i></span>

            <span onClick={event => {
                event.preventDefault()
                const rating = [id, 3]
                onRating(rating)
            }}><i className="fas fa-star"></i></span>

            <span onClick={event => {
                event.preventDefault()
                const rating = [id, 4]
                onRating(rating)
            }}><i className="fas fa-star"></i></span>

            <span onClick={event => {
                event.preventDefault()
                const rating = [id, 5]
                onRating(rating)
            }}><i className="fas fa-star"></i></span>

            <p>{`${rateAvg}/5 (${rateCount})`}</p>
            
        </div>

        {isFav && <button onClick={event => {
            event.preventDefault()
            onWL(id)}}>WISHLISTED!</button>}
            
        {!isFav && <button onClick={event => {
            event.preventDefault()
            onWL(id)}}>Add to wishlist</button>}

        <button onClick={() => onDeck(id)}>Add to deck</button>
    </li>
}


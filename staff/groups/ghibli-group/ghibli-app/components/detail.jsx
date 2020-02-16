function Detail({ film: { img, title, description, director, producer, release, score }}) {
    return <li>
        <img class="details__image" src={img}/>
        <div class="details__info">
            <h3 class="details__info-title">{title}</h3>
            <p class="details__info-description">{description}</p>
            <p class="details__info-director">{director}</p>
            <p class="details__info-producer">{producer}</p>
            <p class="details__info-release">{release}</p>
            <p class="details__info-score">{score}</p>
        </div>
    </li>
}
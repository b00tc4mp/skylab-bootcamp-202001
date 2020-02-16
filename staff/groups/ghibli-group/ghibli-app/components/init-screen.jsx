function Init (props) {
    return <div className="app" onClick={props.goToLanding}>
        <h1 className="app__title">{props.title}</h1>
        <img className="app__logo" src="images/totoro.svg"/>
    </div>
}
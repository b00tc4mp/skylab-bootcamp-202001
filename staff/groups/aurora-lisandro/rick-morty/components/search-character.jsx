function CharacterSearch({onSubmit, warning }) {
    return <form className="search" onSubmit={(event) => {

        event.preventDefault()

        const searchName = event.target.name.value
        console.log(searchName)
        const query = {gender: '', status: '', species: '', name: ''}
        
        let values = document.querySelectorAll('.search__filter')
    
        let i =0
        for(const key in query){
            query[key]=values[i].value
            i++
        }


        onSubmit(query)
    }}>
        <h3 className="search__title">Search for crazy characters</h3>

        <div className="search__filters">
            <select className="search__filter">
                <option value="">-Please choose a gender-</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <select className="search__filter">
                <option value="">-Please choose a status-</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unkown">Unkown</option>
            </select>

            <select className="search__filter">
                <option value="">-Please choose a species-</option>
                <option value="human">Human</option>
                <option value="humanoid">Humanoid</option>
                <option value="alien">Alien</option>
            </select>


        </div>

        <div className="search__container">
            <input className="search__input search__filter" type="text" name="name" placeholder="Character name" />
            <button type="submit"
            ><i className="search__lens fas fa-search"></i></button>
        </div>
        {warning && <Feedback level="warning" message={warning} />}

    </form>
}

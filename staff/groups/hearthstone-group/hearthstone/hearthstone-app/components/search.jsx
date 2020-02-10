function Search({ query, onSubmit, onToQualities }) {
    return <form className="search" onSubmit={event => {
        event.preventDefault()

        query = `search/${event.target.query.value}`
        onSubmit(query)
    }}>

        <h2>SEARCH CARDS</h2>
        <input className="browser" type="text" name="query" placeholder="Type here to search of a card" />

        <button onClick={event => {
            event.preventDefault()
            onToQualities()
        }}>SEARCH BY QUALITIES</button>

        <button>SEARCH</button>
        
    </form>
}
        {/* <h4 className="accordion">By Class</h4>
            <select className='container-filters'>
                <option  name = "Druid" value ="Druid"  >Druid     </option>
                <option  name = "Hunter" value ="Hunter" >Hunter     </option>
                <option  name = "Mage" value ="Mage" >Mage     </option>
                <option  name = "Paladin" value ="Paladin" >Paladin     </option>
                <option  name = "Priest" value ="Priest" >Priest     </option>
                <option  name = "Rogue" value ="Rogue" >Rogue     </option>
                <option  name = "Shaman" value ="Shaman" >Shaman     </option>
                <option  name = "Warlock" value ="Warlock" >Warlock     </option>
                <option  name = "Warrior" value ="Warrior" >Warrior     </option>
                <option  name = "Dream" value ="Dream" >Dream</option>
            </select>
            <h4 className="accordion">By Race</h4>
            <select className='container-filters'>
                <option  name = "Demon" value ="Demon" >Demon </option>
                <option  name = "Dragon" value ="Dragon" >Dragon</option>
                <option  name = "Mech" value ="Mech">Mech</option>
                <option  name = "Murloc" value ="Murloc" >Murloc</option>
                <option  name = "Beast" value ="Beast" >Beast</option>
                <option  name = "Pirate" value ="Pirate" >Pirate</option>
                <option  name = "Totem" value ="Totem" >Totem</option>
            </select>
            <h4 className="accordion">By Faction</h4>
            <select className="container-filters">
                <option  name="horde" value="Horde"> Horde</option>
                <option  name="alliance" value="Alliance" >Alliance</option>
                <option  name="neutral" value="Neutral">Neutral </option>
            </select>
            
            <h4 className="accordion">By Type</h4>
            <select className="container-filters">
                <option  name="hero" value="Hero" >Hero</option>
                <option  name="minion" value="Minion" >Minion</option>
                <option  name="spell" value="Spell">Spell</option>
                <option  name="enchantment" value="Enchantment" >Enchantment</option>
                <option  name="weapon" value="Weapon"> Weapon </option>
                <option  name="hero power" value="Hero Power">Hero Power</option> 
            </select> */}

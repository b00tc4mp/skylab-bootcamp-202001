function Types({onChange, property, search, address}){

  const {types} = search

  let options=  [  
    "Artifact",
    "Conspiracy",
    "Creature",
    "Enchantment",
    "Instant",
    "Land",
    "Phenomenon",
    "Plane",
    "Planeswalker",
    "Scheme",
    "Sorcery",
    "Tribal",
    "Vanguard"
  ]

  return (
    <div>
      <p>Types</p>
      <br/>
      <Select 
        onChange={onChange}
        data={options}
        property={property} 
        defaultValue={types}
        address={address}
      /> 
    </div>
  ) 
}
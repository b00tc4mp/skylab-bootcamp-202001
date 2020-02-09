function Types({onChange, property}){

  const options=  [  
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
      <h3 style={{color: 'white'}}>Type</h3>
      <Select onChange={onChange} data={options} property={property} /> 
    </div>
  ) 
}
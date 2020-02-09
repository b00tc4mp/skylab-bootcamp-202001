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

  return <Select onChange={onChange} data={options} property={property} /> 
}
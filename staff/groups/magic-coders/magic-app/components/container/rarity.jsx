function Rarity({onChange, property}){

  const options=  [ "Common", "Uncommon", "Rare"]
  
  return <Select onChange={onChange} data={options} property={property} />
}
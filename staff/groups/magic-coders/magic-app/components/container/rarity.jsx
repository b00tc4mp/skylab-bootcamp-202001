function Rarity({onChange, property}){

  const options=  [ "Common", "Uncommon", "Rare"]
  
  return (
    <div>
      <h3 style={{color: 'white'}}>Rarity</h3>
      <Select onChange={onChange} data={options} property={property} />
    </div>
  )
  
}
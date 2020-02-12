function Rarity({onChange, property}){

  const options=  [ "Common", "Uncommon", "Rare"]
  
  return (
    <div>
      <p>Rarity</p>
      <br/>
      <Select onChange={onChange} data={options} property={property} />
    </div>
  )
  
}
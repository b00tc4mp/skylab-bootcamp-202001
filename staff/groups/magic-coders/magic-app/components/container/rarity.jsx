function Rarity({onChange, property, search, address}){

  const {rarity} = search

  const options=  [ "Common", "Uncommon", "Rare"]
  
  return (
    <div>
      <p>Rarity</p>
      <br/>
      <Select 
        onChange={onChange} 
        data={options} 
        property={property} 
        defaultValue={rarity}
        address={address}
      />
    </div>
  )
  
}
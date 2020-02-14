function ManaCost({onChange, property, search, address}) {

  const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const {cmc} = search
  
  return (
    <div>
      <p>Mana Cost</p>
      <br/>
      <Select
        onChange={onChange} 
        data={options} 
        property={property}
        defaultValue={cmc}
        address={address}
      />
    </div>
  )
}
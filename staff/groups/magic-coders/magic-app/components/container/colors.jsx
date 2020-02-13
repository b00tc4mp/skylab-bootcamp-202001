function Colors({onChange, property, search, address}) {

  const options = ["white", "blue", "black", "red", "green"]

  const {colors} = search
  
  return (
    <div>
      <p>Colors</p>
      <br/>
      <Checkbox 
        data={options} 
        onChange={onChange} 
        property={property}
        address={address}
        defaultValue={colors}
      />
    </div>
    
  )
  
}
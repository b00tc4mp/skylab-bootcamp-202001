function Colors({onChange, property}) {

  const options = ["white", "blue", "black", "red", "green"]
  
  return (
    <div>
      <h3 style={{color: 'white'}}>Colors</h3>
      <Checkbox data={options} onChange={onChange} property={property} />
    </div>
    
  )
  
}
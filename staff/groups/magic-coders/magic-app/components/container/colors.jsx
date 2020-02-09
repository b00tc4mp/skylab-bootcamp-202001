function Colors({onChange, property}) {

  const options = ["white", "green", "blue", "red", "black"]
  
  return (
    <div>
      <h3 style={{color: 'white'}}>Colors</h3>
      <Checkbox data={options} onChange={onChange} property={property} />
    </div>
    
  )
  
}
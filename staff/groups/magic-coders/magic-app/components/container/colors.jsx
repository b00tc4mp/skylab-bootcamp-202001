function Colors({onChange, property}) {

  const options = ["white", "blue", "black", "red", "green"]
  
  return (
    <div>
      <p>Colors</p>
      <br/>
      <Checkbox data={options} onChange={onChange} property={property} />
    </div>
    
  )
  
}
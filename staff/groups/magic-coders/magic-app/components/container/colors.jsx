function Colors({onChange, property}) {

  const options = ["white", "green", "blue", "red", "black"]
  
  return <Checkbox data={options} onChange={onChange} property={property} />
}
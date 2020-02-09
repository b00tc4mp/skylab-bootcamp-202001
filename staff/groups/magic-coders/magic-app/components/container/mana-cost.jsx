function ManaCost({onChange, property}) {

  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div>
      <h3 style={{color: 'white'}}>Mana Cost</h3>
      <Select onChange={onChange} data={options} property={property} />
    </div>
  )
}
function ManaCost({onChange, property, search}) {

  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const {cmc} = search
  console.log(cmc);

  return (
    <div>
      <p>Mana Cost</p>
      <br/>
      <Select 
        onChange={onChange} 
        data={options} 
        property={property}
        defaultValue={cmc}
      />
    </div>
  )
}
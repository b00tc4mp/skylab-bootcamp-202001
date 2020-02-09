function ManaCost({onChange, property}) {

  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return <Select onChange={onChange} data={options} property={property} />
}
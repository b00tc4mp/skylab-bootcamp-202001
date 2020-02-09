function Select(props) {

  return (
  <select onChange={(event) => props.onChange(event, props.property)}>
    <option></option>
    {props.data.map((element, i)=> <option key={i}>{element}</option>)}
  </select>
  )
}
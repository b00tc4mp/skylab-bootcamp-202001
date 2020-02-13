function Select(props) {

  let {defaultValue, data, address} = props

  if (address) {
    const index = data.indexOf(defaultValue)
    let value = data[index]
    data = data.filter(opt => opt !== value)
    data.unshift(value)
  }

  return (
  <select 
    className="select"
    onChange={(event) => props.onChange(event, props.property)}
  >
    {(!props.defaultValue ) && <option></option>}
    {data.map((element, i)=> <option key={i}>{element}</option>)}
  </select>
  )
}

Select.defaultProps = {
  defaultValue: false
}
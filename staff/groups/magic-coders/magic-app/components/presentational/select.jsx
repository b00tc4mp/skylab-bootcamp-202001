function Select(props) {
  let {defaultValue, data, address} = props

  let index
  if (address) index = data.indexOf(defaultValue)

  function createOptions() {
    return data.map((element, i) => {
      if (i == index) {
        return <option selected="selected" key={i}>{element}</option>
      } else {
        return <option key={i}>{element}</option>
      }
    }) 
  }

  return (
    <select className="select" onChange={(event) => props.onChange(event, props.property)}>
      {(!defaultValue) && <option></option>}
      {createOptions()}
    </select>
  )
}

Select.defaultProps = {
  defaultValue: false
}
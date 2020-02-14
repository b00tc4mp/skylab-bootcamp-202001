function Checkbox(props) {

  const {data, onChange, address, defaultValue} = props

  let colors = []
  if (address && defaultValue) colors = defaultValue.split('|')
  
  const _onChange = event => onChange(event, props.property)

  return (
    <section className="colors">

      {data.map((element, i) => {
        
        if(colors.includes(element)) {
          return (
            <label key={i} className="checkbox">
              <input 
                key={i} 
                onChange={_onChange} 
                name={element} 
                type="checkbox"
                defaultChecked={true}
              />
              {` ${firstUppercase(element)}`}
            </label>
          )

        } else {
          return (
            <label key={i} className="checkbox">
              <input 
                key={i} 
                onChange={_onChange} 
                name={element} 
                type="checkbox"
              />
              {` ${firstUppercase(element)}`}
            </label>
          )
        }
      })
    }
    </section>
  )
}
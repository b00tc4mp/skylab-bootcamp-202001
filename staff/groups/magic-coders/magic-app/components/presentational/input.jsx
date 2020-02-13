function Input(props) {
  
  return <input type={props.type} name={props.name} placeholder={props.placeholder} 
    autoComplete={props.autoComplete} required={props.required} defaultValue={props.defaultValue} />
}

Input.defaultProps = {
  name: '',
  placeholder: 'type...',
  type: 'text',
  autoComplete: 'off',
  required: true,
  defaultValue: ''
}

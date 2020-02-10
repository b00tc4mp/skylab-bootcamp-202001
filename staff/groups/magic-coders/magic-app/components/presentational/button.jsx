function Button(props) {

  const style = {
    backgroundColor: props.backgroundColor,
    borderRadius: '20px',
    color: props.color,
    cursor: 'pointer',
    fontSize: props.fontSize,
    fontWeight: 'bold',
    letterSpacing: '0.8px',
    padding: props.padding,
    textAlign: props.align,
  }

  const onClick = () => {
    props.onClick(props.value)
  }

  return <button onClick={onClick} style={style} type={props.type}>{props.children}</button>
}

Button.defaultProps = {
  align: 'center',
  backgroundColor: '#8937e3',
  color: 'white',
  children: 'Submit',
  fontSize: '14px',
  padding: '8px 20px',
  type: 'submit',
  onClick: () => {}
}
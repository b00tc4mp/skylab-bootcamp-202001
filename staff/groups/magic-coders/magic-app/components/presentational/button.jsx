function Button(props) {

 

  const onClick = () => {
    props.onClick(props.value)
  }

  return <button onClick={onClick} type={props.type}>{props.children}</button>
}

Button.defaultProps = {
  onClick: () => {}
}
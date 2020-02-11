function Button(props) {

  const onClick = () => {
    props.onClick(props.value)
  }

  return <button className={props.className} onClick={onClick} type={props.type}>{props.children}</button>
}

Button.defaultProps = {
  onClick: () => {}
}
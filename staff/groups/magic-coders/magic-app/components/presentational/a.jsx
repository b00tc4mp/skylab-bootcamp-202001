function A(props) {

  const _onClick = event => {
    event.preventDefault()
    props.onClick()
  }

  const style = {
    cursor: 'pointer',
    display: 'block'
  }

return <a className={props.className} style={style} href={props.href} onClick={_onClick}>{props.children}</a>
}

A.defaultProps = {
  href: '/',
  onClick: () => {},
  className: ''
}
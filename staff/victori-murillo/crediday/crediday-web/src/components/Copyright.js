import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom"

export default ({path, color}) => {
  const history = useHistory()

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link style={{cursor: 'pointer'}} color="inherit" onClick={() => history.push(path)} >
        {color && <span style={{color}}>CrediDay</span>}
        {!color && <span>CrediDay</span>}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
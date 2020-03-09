import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom"

export default ({path}) => {
  const history = useHistory()

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link style={{cursor: 'pointer'}} color="inherit" onClick={() => history.push(path)} >
        CrediDay
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
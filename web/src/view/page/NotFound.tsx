import ErrorIcon from '@material-ui/icons/Error';
import * as React from 'react';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ErrorIcon color='error' fontSize="large"></ErrorIcon>
      <div style={{ marginTop: 2, marginLeft: 6, fontSize: 24 }}>No data avaliable for this player!</div>
    </div>
  )
}

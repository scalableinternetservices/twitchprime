import ErrorIcon from '@material-ui/icons/Error';
import * as React from 'react';

export default function Error() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ErrorIcon color='error' fontSize="large"></ErrorIcon>
      <div style={{ marginTop: 2, marginLeft: 6, fontSize: 24 }}>Error! Please try again!</div>
    </div>
  )
}

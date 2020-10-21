import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';

export default function Loading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <CircularProgress />
    </div>
  )
}

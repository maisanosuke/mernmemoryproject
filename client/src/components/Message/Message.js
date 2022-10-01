import React from 'react';
import {Alert} from '@material-ui/lab';

export const Message = ({type,content,deleteFlash}) =>
<Alert severity={type} onClose={deleteFlash}>
  {content}
</Alert>
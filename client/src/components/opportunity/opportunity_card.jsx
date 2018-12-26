import React from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default ({ classes }) => (
  <Card>
    <CardContent>
      <Typography variant="h4" gutterBottom align='center'
        color="secondary">
        Example One
      </Typography>
      <Typography variant="p" gutterBottom align='center'
        color="secondary">
        Description Text
      </Typography>
    </CardContent>
  </Card>
)

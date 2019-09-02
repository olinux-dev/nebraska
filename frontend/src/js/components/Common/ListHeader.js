import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(theme => ({
  sectionHeader: {
    padding: '1em',
  },
}));

export default function ListHeader(props) {
  const classes = useStyles();
  let actions = props.actions || [];

  return (<Grid
            container
            alignItems="flex-start"
            justify="space-between"
            className={classes.sectionHeader}
          >
            <Grid item>
              <Typography variant="h5">{props.title}</Typography>
            </Grid>
            {actions &&
              <Grid item>
                {actions}
              </Grid>
            }
          </Grid>
  );
}
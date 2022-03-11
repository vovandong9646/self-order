import React, { useContext, useEffect } from 'react';
import { Store } from './../store';
import { createOrder } from './../actions';
import { Alert, Box, Button, Typography } from '@mui/material';
import { useStyles } from './../style';
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from 'react-router-dom';

function CompleteScreen() {
  const styles = useStyles();
  const history = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { order } = state;
  const { loading, error, newOrder } = state.orderCreate;

  useEffect(() => {
    if (order.orderItems.length > 0) {
      createOrder(dispatch, order);
    }
  }, [order, dispatch]);

  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
          Logo
          <br />
          {loading ? (
            <SyncIcon />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Typography gutterBottom className={styles.title} variant="h3" component="h3">
                Your order has been placed
              </Typography>
              <Typography gutterBottom className={styles.title} variant="h1" component="h1">
                Thank you!
              </Typography>
              <Typography gutterBottom className={styles.title} variant="h3" component="h3">
                Your order number is {newOrder.number}
              </Typography>
            </>
          )}
        </Box>
        <Box className={[styles.center, styles.space]}>
          <Button onClick={() => history('/')} variant="contained" color="primary" className={styles.largeButton}>
            Order again
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CompleteScreen;

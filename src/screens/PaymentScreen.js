import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './../style';
import { useNavigate } from 'react-router-dom';
import SyncIcon from '@mui/icons-material/Sync';

function PaymentScreen() {
  const styles = useStyles();
  const history = useNavigate();
  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
          Logo
          <Typography gutterBottom className={styles.title} variant="h3" component="h3">
            Please follow the instruction on the PIN pad
          </Typography>
          <SyncIcon></SyncIcon>
        </Box>
      </Box>
      <Box className={[styles.center, styles.space]}>
        <Button onClick={() => history('/complete')} className={styles.largeButton} variant="contained" color="primary">
          Complete Order
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentScreen;

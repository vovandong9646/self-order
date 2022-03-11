import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useStyles } from './../style';
import { setPaymentType } from './../actions';
import { Store } from './../store';
import { useNavigate } from 'react-router-dom';

function SelectPaymentScreen() {
  const styles = useStyles();
  const history = useNavigate();
  const { dispatch } = useContext(Store);

  const selectHandler = (paymentType) => {
    setPaymentType(dispatch, paymentType);
    if (paymentType === 'Pay here') {
      history('/payment');
    } else {
      history('/complete');
    }
  };

  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        Logo
        <Typography className={styles.center} gutterBottom variant="h3" component="h3">
          Select payment type
        </Typography>
        <Box className={styles.cards}>
          <Card className={[styles.card, styles.space]}>
            <CardActionArea onClick={() => selectHandler('Pay here')}>
              <CardMedia
                component="img"
                alt="Pay here"
                image="https://dummyimage.com/100x100/000/535461.jpg"
                className={styles.media}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="p" color="textPrimary">
                  PAY HERE
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={[styles.card, styles.space]}>
            <CardActionArea onClick={() => selectHandler('At counter')}>
              <CardMedia
                component="img"
                alt="At counter"
                image="https://dummyimage.com/100x100/000/535461.jpg"
                className={styles.media}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="p" color="textPrimary">
                  AT COUNTER
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default SelectPaymentScreen;

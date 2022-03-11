import { Box, Fade, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import React, { useContext } from 'react';
import { setOrderType } from '../actions';
import { Store } from '../store';
import { useStyles } from './../style';
import { useNavigate } from 'react-router-dom';

function ChooseScreen(props) {
  const styles = useStyles();
  const { dispatch } = useContext(Store);
  const history = useNavigate();

  const chooseHandler = (orderType) => {
    setOrderType(dispatch, orderType);
    history('/order');
  };

  return (
    <Fade in={true}>
      <Box className={[styles.root, styles.navy]}>
        <Box className={[styles.main, styles.center]}>
          <Typography component="h3" variant="h3" className={styles.center}>
            Where will you be eating today?
          </Typography>
          <Box className={styles.cards}>
            <Card className={[styles.card, styles.space]}>
              <CardActionArea onClick={() => chooseHandler('Eat in')}>
                <CardMedia
                  component="img"
                  alt="Eat in"
                  image="https://dummyimage.com/100x100/000/535461.jpg"
                  className={styles.media}
                />
                <CardContent>
                  <Typography component="p" variant="h4" color="textPrimary" gutterBottom>
                    Eat in
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={[styles.card, styles.space]}>
              <CardActionArea onClick={() => chooseHandler('Take out')}>
                <CardMedia
                  component="img"
                  alt="Take out"
                  image="https://dummyimage.com/100x100/000/535461.jpg"
                  className={styles.media}
                />
                <CardContent>
                  <Typography component="p" variant="h4" color="textPrimary" gutterBottom>
                    Take Out
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}

export default ChooseScreen;

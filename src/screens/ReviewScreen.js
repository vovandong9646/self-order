import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { useStyles } from '../style';
import { Store } from '../store';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { addToOrder, removeFromOrder } from './../actions';
import { useNavigate } from 'react-router-dom';

function ReviewScreen() {
  const { state, dispatch } = useContext(Store);
  const styles = useStyles();
  const history = useNavigate();
  const { orderItems, itemsCount, taxPrice, totalPrice, orderType } = state.order;
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});

  const addToOrderhandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };

  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  };

  const closeHandle = () => {
    setIsOpen(false);
  };

  const productClickHandler = (product) => {
    setProduct(product);
    setIsOpen(true);
  };

  const proceedToCheckoutHandler = () => {
    history('/select-payment');
  };

  return (
    <Box className={[styles.root]}>
      <Box className={[styles.main, styles.navy, styles.center]}>
        <Dialog maxWidth="sm" fullWidth={true} open={isOpen} onClose={closeHandle}>
          <DialogTitle className={styles.center}>Add {product.name}</DialogTitle>
          <Box className={[styles.row, styles.center]}>
            <Button
              variant="container"
              color="primary"
              disabled={quantity === 1}
              onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
            >
              <RemoveIcon />
            </Button>
            <TextField
              inputProps={{ className: styles.largeInput }}
              type="number"
              min={1}
              value={quantity}
              className={styles.largeNumber}
              variant="filled"
            />
            <Button variant="container" color="primary" onClick={(e) => setQuantity(quantity + 1)}>
              <AddIcon />
            </Button>
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={cancelOrRemoveFromOrder}
              variant="contained"
              color="primary"
              size="large"
              className={styles.largeButton}
            >
              {orderItems.find((x) => x.id === product.id) ? 'Remove From Order' : 'Cancel'}
            </Button>
            <Button
              onClick={addToOrderhandler}
              variant="contained"
              color="primary"
              sie="large"
              className={styles.largeButton}
            >
              Add To Order
            </Button>
          </Box>
        </Dialog>

        <Box className={[styles.center, styles.column]}>
          <p>Logo</p>
          <Typography gutterBottom className={styles.title} variant="h3" component="h3">
            Review my {orderType} order
          </Typography>
          <Grid container>
            {orderItems.map((orderItem) => (
              <Grid item md={12} key={orderItem._id}>
                <Card className={styles.card} onClick={() => productClickHandler(orderItem)}>
                  <CardActionArea>
                    <CardContent>
                      <Box className={[styles.row, styles.between]}>
                        <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                          {orderItem.name}
                        </Typography>
                        <Button variant="contained">Edit</Button>
                      </Box>
                      <Box className={[styles.row, styles.between]}>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {orderItem.calarie} Cal
                        </Typography>
                        <Typography variant="body2" color="textPrimary" component="p">
                          {orderItem.quantity} x ${orderItem.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Box>
            <Box className={[styles.bordered, styles.space]}>
              My Order - {orderType === 'takeout' ? 'Take out' : 'Eat in'}| Tax: ${taxPrice} | Toal: ${totalPrice} |
              Items: {itemsCount}
            </Box>
            <Box className={[styles.row, styles.around]}>
              <Button
                onClick={() => history('/order')}
                variant="contained"
                color="primary"
                className={styles.largeButton}
              >
                Back
              </Button>

              <Button
                onClick={proceedToCheckoutHandler}
                variant="contained"
                color="success"
                className={styles.largeButton}
              >
                Process To Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewScreen;

import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  Alert,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
import { useStyles } from './../style';
import { listCategories, listProducts, addToOrder, removeFromOrder, clearOder } from './../actions';
import { Store } from '../store';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function OrderScreen() {
  const styles = useStyles();

  const history = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoriesList;
  const { products, loading: loadingProducts, error: errorProducts } = state.productList;
  const { orderItems, itemsCount, taxPrice, totalPrice, orderType } = state.order;
  const [categoryName, setCategoryName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!categories) {
      listCategories(dispatch);
    } else {
      listProducts(dispatch, categoryName);
    }
  }, [dispatch, categoryName, categories]);

  const categoryClickHandler = (categoryName) => {
    setCategoryName(categoryName);
    listProducts(dispatch, categoryName);
  };

  const closeHandle = () => {
    setIsOpen(false);
  };

  const productClickHandler = (product) => {
    setProduct(product);
    setIsOpen(true);
  };

  const addToOrderhandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };

  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  };

  const previewOrderHandler = () => {
    history('/review');
  };

  return (
    <Box className={styles.root}>
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
            // inputProps={{ bar: true, inputProps: { className: styles.largeInput } }}
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

      <Box className={styles.main}>
        <Grid container>
          <Grid item md={2}>
            <List>
              {loading ? (
                <ChangeCircleIcon />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  {categories.map((category) => (
                    <ListItem key={category.name} onClick={() => categoryClickHandler(category.name)}>
                      <Avatar alt={category.name} src={category.image}></Avatar>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Grid>
          <Grid item md={10}>
            <Typography gutterBottom className={styles.title} variant="h2" component="h2">
              {categoryName || 'Main menu'}
            </Typography>
            <Grid container spacing={1}>
              {loadingProducts ? (
                <ChangeCircleIcon />
              ) : errorProducts ? (
                <Alert severity="error">{errorProducts}</Alert>
              ) : (
                <>
                  {products.map((product) => (
                    <Grid item md={6} key={product._id}>
                      <Card className={styles.card}>
                        <CardActionArea onClick={() => productClickHandler(product)}>
                          <CardMedia
                            component="img"
                            alt={product.name}
                            image={product.image}
                            className={styles.media}
                          ></CardMedia>
                          <CardContent>
                            <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                              {product.name}
                            </Typography>
                            <Box className={styles.cardFooter}>
                              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                                {product.calarie}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Box>
          <Box className={[styles.bordered, styles.space]}>
            My Order - {orderType} | Tax: ${taxPrice} | Total: ${totalPrice} | Items: {itemsCount}
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={() => {
                clearOder(dispatch);
                history('/');
              }}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              Cancel Order
            </Button>
            <Button
              onClick={() => {
                previewOrderHandler(dispatch);
              }}
              variant="contained"
              color="primary"
              disabled={orderItems.length === 0}
              className={styles.largeButton}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default OrderScreen;

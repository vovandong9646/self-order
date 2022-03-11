const express = require('express');
const data = require('./data');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect mong
mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => console.log('connect success'))
  .catch((err) => console.log(err));

// tạo model cho product
const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calarie: Number,
    category: String,
  }),
);

// tạo data product
app.get('/api/products/seed', async (req, res) => {
  const products = await Product.insertMany(data.products);
  res.send(products);
});

// get produc theo category hoặc get all nếu không có param ?category=xxx
app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.send(products);
});

// add product
app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

// get all categories
app.get('/api/categories', (req, res) => {
  res.send(data.categories);
});

const Order = mongoose.model(
  'Orders',
  new mongoose.Schema(
    {
      number: { type: Number, default: 0 },
      orderType: String,
      paymentType: String,
      isPaid: { type: Boolean, default: false },
      isReady: { type: Boolean, default: false },
      isProgress: { type: Boolean, default: true },
      isCanceled: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      itemsPrice: Number,
      taxPrice: Number,
      totalPrice: Number,
      orderItems: [
        {
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
    },
    { timestamps: true },
  ),
);

app.post('/api/orders', async (req, res) => {
  const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
  const { orderType, paymentType, orderItems } = req.body;
  if (!orderType || !paymentType || !orderItems || orderItems.length === 0) {
    return res.send({ message: 'Data is required' });
  }

  const order = await new Order({ ...req.body, number: lastNumber + 1 }).save();
  res.send(order);
});

app.use(express.static(path.join(__dirname, '/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running at port ' + port));

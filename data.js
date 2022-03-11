const data = {
  categories: [
    { name: 'Beverages', image: '/images/beverages.jpg' },
    { name: 'Breakfast', image: '/images/breakfast.jpg' },
    { name: 'Burgers', image: '/images/burgers.png' },
  ],
  products: [
    {
      category: 'Beverages',
      name: 'Coca-cola',
      price: 2,
      calarie: 170,
      image: 'https://dummyimage.com/100x100/000/535461.jpg',
      description: 'desc coca cola',
    },
    {
      category: 'Breakfast',
      name: 'Bread',
      price: 1,
      calarie: 170,
      image: 'https://dummyimage.com/100x100/000/535461.jpg',
      description: 'desc banh my',
    },
  ],
};

module.exports = data;

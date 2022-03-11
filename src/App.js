import { CssBaseline, ThemeProvider, Paper, Container, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChooseScreen from './screens/ChooseScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import ReviewScreen from './screens/ReviewScreen';
import SelectPaymentScreen from './screens/SelectPaymentScreen';
import CompleteScreen from './screens/CompleteScreen';

const theme = createTheme({
  typography: {
    h1: { fontWeight: 'bold' },
    h2: { fontSize: '2rem', color: 'black' },
    h3: { fontSize: '1.8rem', fontWeight: 'bold', color: 'white' },
  },
  palette: {
    primary: { main: '#ff1744' },
    secondary: { main: '#118e16', contrastText: '#ffffff' },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact={true} />
              <Route path="/choose" element={<ChooseScreen />} exact={true} />
              <Route path="/order" element={<OrderScreen />} exact={true} />
              <Route path="/review" element={<ReviewScreen />} exact={true} />
              <Route path="/select-payment" element={<SelectPaymentScreen />} exact={true} />
              <Route path="/payment" element={<PaymentScreen />} exact={true} />
              <Route path="/complete" element={<CompleteScreen />} exact={true} />
            </Routes>
          </Paper>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

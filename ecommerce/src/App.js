import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/layout/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import { MyCartContext, MyUserContext } from "./configs/Contexts";
import { useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import Store from "./components/Store";
import ProductDetail from "./components/ProductDetail";

import MyCartReducer from "./reducers/MyCartReducer";
import MyStore from "./components/MyStore";
import Order from "./components/Order";
import Company from "./components/Company";
import RegisterCompany from "./components/RegisterCompany";
import Stats from "./components/Stats";

import PaymentCallback from './components/Payments/PaymentCallback';
import { CartProvider } from "./configs/CartContext";
import PaymentHistory from "./components/PaymentHistory";



const App = () => {

  let [user, dispatch] = useReducer(MyUserReducer, null);
  let [cartCounter, dispatchCartCounter] = useReducer(MyCartReducer, 0);

  return (
    <MyUserContext.Provider value={[user, dispatch]}>

      <MyCartContext.Provider value={[cartCounter, dispatchCartCounter]}>
    
      <CartProvider>
        <BrowserRouter>
        <Header />

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/store/:id" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
         


              <Route path="/my-store" element={<MyStore />} />


              <Route path="/order" element={<Order />} />

              <Route path="/company" element={<Company />} />
              <Route path="/register-company" element={<RegisterCompany />} />

              <Route path="/stats" element={<Stats />} />
            </Routes>
          </Container>

          <Footer />

        </BrowserRouter>
        </CartProvider>
      </MyCartContext.Provider>

     
     

    </MyUserContext.Provider>
  );
}

export default App;

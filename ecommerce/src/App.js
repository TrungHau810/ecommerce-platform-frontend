import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/layout/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import { MyUserContext } from "./configs/Contexts";
import { useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import Store from "./components/Store";


const App = () => {

  let [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/store/:id" element={<Store />} />
          </Routes>
        </Container>

        <Footer />

      </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;

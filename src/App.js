import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "react-router-scroll-to-top";
import Home from "./Pages/Home";
import SingleCard from "./Pages/SingleCard";
import Index from "./Layout/Index";
import Footer from "./Layout/Footer/Footer";
import Product from "./Pages/Product";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
// import ConformOrder from "./DashBoard/Pages/ConformOrder";
import UserOrderDetails from "./Pages/UserOrderDetails";
import NotFound from "./Layout/NotFoundPage/NotFound";
import Allcollection from "./Pages/Allcollection";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import PrivicyPolicy from "./Pages/PrivicyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions ";
import RefundPolicy from "./Pages/RefundPolicy";
import UserLogin from "./Pages/UserLogin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-center" theme="colored" />
      {/* =================== */}
      <Index />
      {/* ========================== */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/privacypolicy" element={<PrivicyPolicy />} />
        <Route path="/termsconditions" element={<TermsAndConditions />} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />
        
        {/* ---- single card  */}
        <Route path="/singleCard/:id" element={<SingleCard />} />
        <Route path="/allcollection/:all" element={<Allcollection />} />

        {/* -------- product Page  */}
        <Route exact path="/products/:category" element={<Product />} />
        <Route exact path="/product/:id" element={<SingleProduct />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/payment" element={<Payment />} />
        {/* <Route exact path="/conformOrder" element={<ConformOrder />} /> */}

        {/* ============ user route  */}
        <Route path="/user/Login" element={<UserLogin />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/order/details/:id" element={<UserOrderDetails />} />

        {/* ===== page not found  */}
        <Route path="/*" element={<NotFound />} />

      </Routes>
      {/* =============== */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
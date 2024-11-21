import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "react-router-scroll-to-top";

import { LogedinUser } from "./Redux/Action/UserAction";

import { getallproduct } from "./Redux/Action/ProductAction";
import Home from "./Pages/Home";

import SingleCard from "./Pages/SingleCard";
import Payment from "./Pages/Payment";
import UserOrderDetails from "./Pages/UserOrderDetails";

import Index from "./Layout/Index";
import Footer from "./Layout/Footer/Footer";
import Cookies from "js-cookie";
import Allcollection from "./Pages/Allcollection";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import PrivicyPolicy from "./Pages/PrivicyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions ";
import RefundPolicy from "./Pages/RefundPolicy";
import UserLogin from "./Pages/UserLogin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import NotFound from "./Layout/NotFoundPage/NotFound";



// import AllProducts from "./DashBoard/Pages/AllProducts";
// import Product from "./Pages/Product";
// import SingleProduct from "./Pages/SingleProduct";
// import Cart from "./Pages/Cart";
// import ConformOrder from "./DashBoard/Pages/ConformOrder";

// import AdminLogin from "./DashBoard/Accounts/AdminLogin";

// import DashBoardIndex from "./DashBoard/DashBoardIndex";

// import ParentCategoryList from "./DashBoard/Pages/ParentCategoryList";
// import CreateParentCategory from "./DashBoard/Pages/CreateParentCategory";
// import EditParentCategory from "./DashBoard/Pages/EditParentCategory";

// import CategoryList from "./DashBoard/Pages/CategoryList";
// import CreateCategory from "./DashBoard/Pages/CreateCategory";
// import EditCreateCategory from "./DashBoard/Pages/EditCategory";

// import SubCategoryList from "./DashBoard/Pages/SubCategoryList";
// import CreateSubCategory from "./DashBoard/Pages/CreateSubCategory";
// import EditSubCategory from "./DashBoard/Pages/EditSubCategory";

// import CreateProduct from "./DashBoard/Pages/CreateProduct";
// import ProductView from "./DashBoard/Pages/ProductView";

// import Artists from "./DashBoard/Pages/Artists";
// import CreateArtist from "./DashBoard/Pages/CreateArtist";
// import EditArtist from "./DashBoard/Pages/EditArtist";

// import AllUsers from "./DashBoard/Pages/AllUsers";

const App = () => {
  const user = useSelector((state) => state.user.user);
  const isAuthantication = useSelector((state) => state.user.isAuthantication);

  // ============ admin privateRoute
  const AdminPrivateRoute = () => {
    return isAuthantication === false || (user && user.IsAdmin === 0) ? (
      <Navigate replace to="/login" />
    ) : (
      <Outlet />
    );
  };
  // ------------ redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("ApiLoginTokenjkhjkhkjh")) {
      dispatch(LogedinUser());
    }
    dispatch(getallproduct());
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-center" theme="colored" />
      {/* =================== */}
      <Index />
      {/* ========================== */}
      <Routes>
        <Route path="/" element={<Home />} />


        {/* ---- Card  */}
        <Route path="/singleCard/:id" element={<SingleCard />} />
        <Route path="/allcollection/:all" element={<Allcollection />} />
        <Route exact path="/checkout" element={<Payment />} />

        {/* ============ user route  */}
        <Route path="/user/Login" element={<UserLogin />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/order/details/:id" element={<UserOrderDetails />} />

        {/* static pages */}
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/privacypolicy" element={<PrivicyPolicy />} />
        <Route path="/termsconditions" element={<TermsAndConditions />} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />

        {/* ===== page not found  */}
        <Route path="/*" element={<NotFound />} />





        {/* -------- product Page  */}
        {/* <Route exact path="/products/:category" element={<Product />} />
        <Route exact path="/product/:id" element={<SingleProduct />} />
        <Route exact path="/cart" element={<Cart />} /> */}
        {/* <Route exact path="/conformOrder" element={<ConformOrder />} /> */}


        {/* Admin Portal Routes */}
        {/* ---------- login  */}
        {/* <Route path="/login" element={<AdminLogin />} /> */}

        {/* ----------admin Route  */}
        {/* <Route path="/admin/dashboard" element={<AdminPrivateRoute />}>
          <Route path="/admin/dashboard" element={<DashBoardIndex />} />
        </Route> */}

        {/* ----------- Parent Category List  */}
        {/* <Route path="/admin/parent-category/list" element={<AdminPrivateRoute />}>
          <Route path="/admin/parent-category/list" element={<ParentCategoryList />} />
        </Route> */}

        {/* Create Parent Category */}
        {/* <Route path="/admin/create/parent-category" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/parent-category" element={<CreateParentCategory />} />
        </Route> */}

        {/* Update Parent Category */}
        {/* <Route path="/admin/parent-category/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/parent-category/:id" element={<EditParentCategory />} />
        </Route> */}

        {/* ----------- Category List  */}
        {/* <Route path="/admin/category/list" element={<AdminPrivateRoute />}>
          <Route path="/admin/category/list" element={<CategoryList />} />
        </Route> */}

        {/* Create Category */}
        {/* <Route path="/admin/create/category" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/category" element={<CreateCategory />} />
        </Route> */}

        {/* Update Category */}
        {/* <Route path="/admin/category/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/category/:id" element={<EditCreateCategory />} />
        </Route> */}

        {/* ----------- Sub Category List  */}
        {/* <Route path="/admin/sub-category/list" element={<AdminPrivateRoute />}>
          <Route path="/admin/sub-category/list" element={<SubCategoryList />} />
        </Route> */}

        {/* Create Sub Category */}
        {/* <Route path="/admin/create/sub-category" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/sub-category" element={<CreateSubCategory />} />
        </Route> */}

        {/* Update Sub Category */}
        {/* <Route path="/admin/sub-category/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/sub-category/:id" element={<EditSubCategory />} />
        </Route> */}

        {/* ------- all product */}
        {/* <Route path="/admin/products" element={<AdminPrivateRoute />}>
          <Route path="/admin/products" element={<AllProducts />} />
        </Route> */}

        {/* ------------- admin/create/product  */}
        {/* <Route path="/admin/create/product" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/product" element={<CreateProduct />} />
        </Route> */}

        {/* <Route path="/admin/products/view/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/products/view/:id" element={<ProductView />} />
        </Route> */}


        {/* Get all artist */}
        {/* <Route path="/admin/artists" element={<AdminPrivateRoute />}>
          <Route path="/admin/artists" element={<Artists />} />
        </Route> */}

        {/* Create Artist */}
        {/* <Route path="/admin/create/artists" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/artists" element={<CreateArtist />} />
        </Route> */}

        {/* Update Artist */}
        {/* <Route path="/admin/artists/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/artists/:id" element={<EditArtist />} />
        </Route> */}


        {/* <Route path="/admin/allusers" element={<AdminPrivateRoute />}>
          <Route path="/admin/allusers" element={<AllUsers />} />
        </Route> */}

        {/* ------- sub category  */}

        {/* <Route path="/admin/subcategory/list" element={<AdminPrivateRoute />}>
          <Route path="/admin/subcategory/list" element={<SubCategoryList />} />
        </Route> */}
        {/* ------- order list  */}
        {/* <Route path="/admin/orderlist" element={<AdminPrivateRoute />}>
          <Route path="/admin/orderlist" element={<OrderList />} />
        </Route> */}


        {/* -------- single order deatail  */}
        {/* <Route path="/admin/order/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/order/:id" element={<SingleOrder />} />
        </Route> */}
        {/* -------- vindor list  */}
        {/* <Route path="/admin/vendor" element={<AdminPrivateRoute />}>
          <Route path="/admin/vendor" element={<Vindor />} />
        </Route> */}
        {/* -------- createvindor list  */}
        {/* <Route path="/admin/create/vendor" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/vendor" element={<CreateVendor />} />
        </Route> */}
        {/* ------- vendor single list  */}
        {/* <Route path="/admin/vendor/detail/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/vendor/detail/:id" element={<SingleVendor />} />
        </Route> */}

        {/* 
        
        <Route path="/admin/allusers" element={<AdminPrivateRoute />}>
          <Route path="/admin/allusers" element={<AllUsers />} />
        </Route>

        <Route path="/admin/artists" element={<AdminPrivateRoute />}>
          <Route path="/admin/artists" element={<Artists />} />
        </Route>

        <Route path="/admin/user/Analytics" element={<AdminPrivateRoute />}>
          <Route path="/admin/user/Analytics" element={<UserAnalytics />} />
        </Route>

        <Route path="/admin/product/discount" element={<AdminPrivateRoute />}>
          <Route path="/admin/product/discount" element={<Discounts />} />
        </Route>

        <Route path="/admin/create/package" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/package" element={<CreatePackage />} />
        </Route>
        <Route path="/admin/edit/package/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/edit/package/:id" element={<EditPackage />} />
        </Route> */}




        {/* ========================== vendor Dasboard  routes */}

        {/* <Route path="/vendor/login" element={<VendorLogin />} />

        <Route path="/vendor/orders" element={<Orders />} />
        <Route path="/vendor/pendingorders" element={<PendingOrders />} />

        <Route path="/vendor/completedorders" element={<CompletedOrders />} />

        <Route path="/vendor/rejectedorders" element={<RejectedOrders />} />

        <Route
          path="/vendor/dashboard"
          element={
            <VendorAuth>
              <VendorDashBoard />{" "}
            </VendorAuth>
          }
        /> */}


      </Routes>
      {/* =============== */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;

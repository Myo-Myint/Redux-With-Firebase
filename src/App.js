import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";

import { useEffect } from "react";
import Layout from "./components/Layout/Layout";

import Notification from "./components/Layout//Notification";
import {  fetchCartData, updateCart } from "./store/store";


function App() {
  const latestCart = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.ui.notification);
  const hasUserInteracted = useSelector((state) => state.ui.hasUserInteracted);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);

  useEffect(() => {
    if (!hasUserInteracted) {
      return;
    }
    dispatch(updateCart(latestCart));
  }, [latestCart, dispatch, hasUserInteracted]);

  console.log(notification);

  return (
    <Layout>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Cart />
      <Products />
    </Layout>
  );
}

export default App;

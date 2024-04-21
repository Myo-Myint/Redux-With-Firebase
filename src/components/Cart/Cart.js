import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isCartVisible = useSelector((state) => state.ui.cartIsVisible);

  return (
    <>
      {isCartVisible && (
        <Card className={classes.cart}>
          <h2>Your Shopping Cart</h2>
          <ul>
            <CartItem items={cartItems} />
          </ul>
        </Card>
      )}
    </>
  );
};

export default Cart;

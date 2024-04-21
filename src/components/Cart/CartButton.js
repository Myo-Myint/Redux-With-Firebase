import classes from "./CartButton.module.css";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/store";

const CartButton = (props) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const clickHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <button onClick={clickHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;

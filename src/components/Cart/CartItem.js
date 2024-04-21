import { useDispatch, useSelector } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions, uiActions } from "../../store/store";

const CartItem = (props) => {
  const dispatch = useDispatch();


  const items = useSelector((state) => state.cart.items);
  if (items.length === 0)
    return (
      <li className={classes.item}>
        <header>
          <h3>No items in cart</h3>
        </header>
      </li>
    );

 
  const increaseQuantityHandler = (id, title, price) => {
    dispatch(cartActions.addToCart({ id: id, title, price}));
    dispatch(uiActions.setUserInteracted())
  }

  const decreaseQuantityHandler = (id, title, price) => {
    dispatch(cartActions.removeFromCart({ id: id, title, price}));
    dispatch(uiActions.setUserInteracted())
  }

  return (
    <>
      {items.map((item) => {
        const { quantity, price } = item;
        const total = quantity * price;

        return (
          <li key={item.id} className={classes.item}>
            <header>
              <h3>{item.title}</h3>
              <div className={classes.price}>
                ${total.toFixed(2)}{" "}
                <span className={classes.itemprice}>
                  (${price.toFixed(2)}/item)
                </span>
              </div>
            </header>
            <div className={classes.details}>
              <div className={classes.quantity}>
                x <span>{quantity}</span>
              </div>
              <div className={classes.actions}>
                <button onClick={() => decreaseQuantityHandler(item.id, item.title, item.price)}>-</button>
                <button onClick={() => increaseQuantityHandler(item.id, item.title, item.price)}>+</button>
              </div>
            </div>
          </li>
        )
      })}
    </>
  );
};

export default CartItem;

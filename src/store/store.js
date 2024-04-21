import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchData, putData } from "../http/http";

// {
//     id: 1,
//     title: "T-shirt",
//     price: 29.99,
//     quantity: 2,
// }

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    notification: null,
    hasUserInteracted: false,
  },
  reducers: {
    toggleCart: (state) => {
      state.cartIsVisible = !state.cartIsVisible;
    },
    setNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearNotification(state) {
      state.notification = null;
    },
    setUserInteracted: (state) => {
      state.hasUserInteracted = true;
    },
  },
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // console.log(action.payload);
      if (state.items.length > 0) {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity += 1;
          // console.log("here");
        } else {
          state.items.push(action.payload);
        }
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      if (state.items.length > 0) {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (itemIndex >= 0) {
          if (state.items[itemIndex].quantity === 0) {
            state.items = state.items.filter(
              (item) => item.id !== action.payload.id
            );
          } else {
            state.items[itemIndex].quantity -= 1;
            if (state.items[itemIndex].quantity === 0) {
              state.items = state.items.filter(
                (item) => item.id !== action.payload.id
              );
            }
          }
        }
      }
    },
    replaceCart: (state, action) => {
      state.items = action.payload.items;
    },
  },
});

export const cartActions = cartSlice.actions;
export const uiActions = uiSlice.actions;
export const updateCart = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    try {
       await putData(cart);

      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      // --
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
    return  async (dispatch) => {
        try {
          dispatch(
            uiActions.setNotification({
              status: "pending",
              title: "Fetching...",
              message: "Fetching cart data!",
            })
          );
          const response = await fetchData();
          const data = await response.json();
  
          dispatch(uiActions.clearNotification());
          dispatch(cartActions.replaceCart({ items: data }));
        } catch (error) {
          dispatch(
            uiActions.setNotification({
              status: "error",
              title: "Error!",
              message: "Fetching cart data failed!",
            })
          );
        }
      };
}

export const store = configureStore({
  reducer: { cart: cartSlice.reducer, ui: uiSlice.reducer },
});

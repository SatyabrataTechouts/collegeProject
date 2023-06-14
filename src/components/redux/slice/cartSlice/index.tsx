// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../configuration';
import { useAppSelector } from '../../hook';

const initialState = {
  cartData: [],
  price:0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartData = action.payload.cartData;
    },
    increaseQuantity: (state, action) => {
      const { itemId } = action.payload;
      const item = state.cartData.find((item) => item.id === itemId);
      if (item) {
        item.qty += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const { itemId } = action.payload;
      const item = state.cartData.find((item) => item.id === itemId);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const { itemId } = action.payload;
      state.cartData = state.cartData.filter((item) => item.id !== itemId);
    },
    existPrice:(state,action)=>{
          state.price=action.payload;
    }
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart,existPrice } = cartSlice.actions;
export default cartSlice.reducer;



export const addToCartAsync = (item, uid,price) => {
    console.log('price', price)
  return async (dispatch) => {
    try {
      const docRef = await getDoc(doc(db, 'cart', uid));
      const existingCartData = docRef.exists() ? docRef.data().cartData : [];

      const newItem = {
        id: item.id,
        name: item.Pname,
        price: item.Price,
        image: item.image,
        qty: 1,
        unitPrice:item.Price,
      };

      const existingItemIndex = existingCartData.findIndex((item) => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        existingCartData[existingItemIndex] = {
          ...existingCartData[existingItemIndex],
          qty: existingCartData[existingItemIndex]?.qty + 1,
          price:existingCartData[existingItemIndex]?.price+existingCartData[existingItemIndex]?.unitPrice
        };
        
      } else {
        existingCartData.push(newItem);
      }

      await setDoc(doc(db, 'cart', uid), {
        cartData: existingCartData,
      });

      dispatch(addToCart({ cartData: existingCartData }));
    } catch (e) {
      console.log('Error:', e);
    }
  };
};

export const increaseQuantityAsync = (itemId, uid,price) => {
   console.log('price', price)
  return async (dispatch) => {
    try {
       
      const docRef = await getDoc(doc(db, 'cart', uid));
      const existingCartData = docRef.exists() ? docRef.data().cartData : [];

      const updatedCartData = existingCartData.map((item) => {
        if (item.id === itemId) {
           
          return {
            ...item,
            qty: item.qty + 1,
            price:item.price+item.unitPrice
            
          };
        }
        return item;
      });

      await updateDoc(doc(db, 'cart', uid), {
        cartData: updatedCartData,
      });

      dispatch(increaseQuantity({ itemId }));
    } catch (e) {
      console.log('Error:', e);
    }
  };
};

export const decreaseQuantityAsync = (itemId, uid) => {
  return async (dispatch) => {
    try {
      const docRef = await getDoc(doc(db, 'cart', uid));
      const existingCartData = docRef.exists() ? docRef.data().cartData : [];

      const updatedCartData = existingCartData.map((item) => {
        if (item.id === itemId && item.qty > 1) {
          return {
            ...item,
            qty: item.qty - 1,
            price:item.price-item.unitPrice,
          };
        }
        return item;
      });

      await updateDoc(doc(db, 'cart', uid), {
        cartData: updatedCartData,
      });

      dispatch(decreaseQuantity({ itemId }));
    } catch (e) {
      console.log('Error:', e);
    }
  };
};

export const removeFromCartAsync = (itemId, uid) => {
  return async (dispatch) => {
    try {
      const docRef = await getDoc(doc(db, 'cart', uid));
      const existingCartData = docRef.exists() ? docRef.data().cartData : [];

      const updatedCartData = existingCartData.filter((item) => item.id !== itemId);

      await updateDoc(doc(db, 'cart', uid), {
        cartData: updatedCartData,
      });

      dispatch(removeFromCart({ itemId }));
    } catch (e) {
      console.log('Error:', e);
    }
  };
};

// YourComponent.js

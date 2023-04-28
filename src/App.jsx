import { useEffect, useReducer } from "react";
import "./App.css";
import Test from './components/Test/Test'
import TableProducts from "./components/Test/TableProduct";
import { productData } from "./components/utils/constants";

const initialState = {
  product: JSON.parse(localStorage.getItem('products')) ||productData,
};
const onlineReducer = (state, action) => {
  switch (action.type) {
    case "addProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    case "incrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.staticPrice,
            };
          }
          return item;
        }),
      };
    case "decrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantity !== 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.staticPrice,
            };
          }
          return item;
        }),
        
      };
      case "removeProducts":
        return {
          ...state,
          product: state.product.map((item) => {
            if (item.id === action.payload && item.quantity !== 0) {
              return {
                ...item,
                quantity: (item.quantity = 0),
                price: item.staticPrice,
              };
            }
            return item;
          }),
        };
    default:
      return state;
  }
};
function App() {
  const [store, dispatchStore] = useReducer(onlineReducer, initialState);

useEffect(()=>{
  localStorage.setItem('products',JSON.stringify(store.product))
},[store.product])

  const incrementProductHandler = (id) => {
    dispatchStore({ type: "incrementProduct", payload: id });
  };
  const decrementProductHandler = (id) => {
    dispatchStore({ type: "decrementProduct", payload: id });
  };
  const addProductHandler = (id) => {
    dispatchStore({ type: "addProduct", payload: id });
  };

  const removeProducts=(id)=>{
    dispatchStore({type:"removeProducts", payload: id})
  }
  return (
    <>
      <Test addProductHandler={addProductHandler} store={store.product} />
      <TableProducts
        decrementProductHandler={decrementProductHandler}
        incrementProductHandler={incrementProductHandler}
        store={store.product}
      removeProducts={removeProducts}
      />
    </>
  );
}
export default App
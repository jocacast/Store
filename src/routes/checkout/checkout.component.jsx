import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout.styles.scss";
import CheckoutItem from "./checkout-item.component";
const Checkout = () => {
  const { cartItems, removeItem, increaseProduct, decreaseProduct, cartTotal} =
    useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItem
            cartItem={cartItem}
            addOneHandler={increaseProduct}
            removeOneHandler={decreaseProduct}
            removeItemHandler={removeItem}
            key={cartItem.id}
          >
          </CheckoutItem>
        );
      })}
      <span className='total'> Total: ${cartTotal}</span>
    </div>
  );


};
export default Checkout;

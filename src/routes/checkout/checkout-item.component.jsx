import "./checkout-item.styles.scss";

const CheckoutItem = (props) => {
  const { cartItem, addOneHandler, removeOneHandler, removeItemHandler } =
    props;
  const { name, id, quantity, price, imageUrl } = cartItem;

  const removeOneHandlerClick = () => removeOneHandler(id);

  const addOneHandlerClick =() => addOneHandler(id);

  return (
    <div key={cartItem.id} className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`}></img>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeOneHandlerClick}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addOneHandlerClick}>&#10095;</div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;

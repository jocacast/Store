import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item.component'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import { useNavigate } from "react-router-dom";
import Button from '../button/button.component';


const CartDropdown =() => {
    const navigate = useNavigate();
  
    const routeChange = () =>{ 
        navigate('checkout')
    }
    const {cartItems} = useContext(CartContext)
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
            {cartItems.map((item)=>{
                return <CartItem key={item.id} cartItem={item}></CartItem>
            })}
            </div>
            <Button onClick={routeChange}>
            Checkout
            </Button>
        </div>
    ) 
}

export default CartDropdown
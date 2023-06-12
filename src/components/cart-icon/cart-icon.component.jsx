import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

import { useContext} from 'react'
import { CartContext } from '../../context/cart.context'

const CartIcon= ()=> {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const toggleIsCartOpen =() => {
        console.log(`Shopping icon clicked`)
        setIsCartOpen(!isCartOpen)
    }
    return(
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen}/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )   
}

export default CartIcon
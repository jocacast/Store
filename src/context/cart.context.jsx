import { createContext, useState, useEffect } from "react"

const addCartItem =(cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id
    });

    if(existingCartItem){
        return cartItems.map((cartItem)=> {
            return cartItem.id === productToAdd.id ? {...cartItem, quantity:cartItem.quantity +1} : cartItem 
        })
    }
    return [...cartItems, {...productToAdd, quantity:1}]
}

const increaseProductByOne= (cartItems, productId) => {
    const cartItemId = productId
    const objIndex = cartItems.findIndex((obj) => obj.id === cartItemId);
    cartItems[objIndex].quantity = cartItems[objIndex].quantity + 1;
    return [...cartItems];
};

const decreaseProductByOne= (cartItems, cartItemId) => {
    const objIndex = cartItems.findIndex((obj) => obj.id === cartItemId);
    if (cartItems[objIndex].quantity - 1 <= 0){
        const objIndex = cartItems.findIndex((obj) => obj.id === cartItemId);
        cartItems.splice(objIndex,1);
        return [...cartItems];
    }else{
        cartItems[objIndex].quantity =cartItems[objIndex].quantity - 1
        return [...cartItems];
    }
};

const removeProduct = (cartItems, cartItemId) => {
    const objIndex = cartItems.findIndex((obj) => obj.id === cartItemId);
    cartItems.splice(objIndex,1);
    return [...cartItems];

}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen :()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    cartCount : 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0); 
    const [cartTotal, setCartTotal] = useState(0); 
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd)) 
    }

    const increaseProduct = (productId) => {
        setCartItems(increaseProductByOne(cartItems, productId))
    }

    const decreaseProduct =(productId)=> {
        setCartItems(decreaseProductByOne(cartItems, productId))
    }

    const removeItem = (productId) => {
        setCartItems(removeProduct(cartItems, productId))
    }

    useEffect(()=>{
        const sum = cartItems.reduce((total,item)=>{
            return total + item.quantity
        },0);
        setCartCount(sum);
    },[cartItems])

    useEffect(()=>{
        const total = cartItems.reduce((total, item) => {
            const addition = item.quantity * item.price;
            return total + addition;
            }, 0);
            setCartTotal(total)
    }, [cartItems]);

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, setCartItems, increaseProduct, decreaseProduct, removeItem, cartTotal}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
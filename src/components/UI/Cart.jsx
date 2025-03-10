
import { useContext, useEffect } from "react";
import Modal from "./Modal.jsx";
import { CartContext } from "../../store/CartContext";
import { UserProgressContext } from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "./Button.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    useEffect(() => {
        console.log("Cart Modal Open Status:", userProgressCtx.progress === "cart");
    }, [userProgressCtx.progress]);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    const handleCloseCart = () => {
        console.log("Closing Cart!");  
        userProgressCtx.hideCart();
    };

    const handleGoToCheckout = () => {
        console.log("Proceeding to Checkout!");  
        userProgressCtx.showCheckout();
    };

    return (
        <Modal 
            className="cart" 
            open={userProgressCtx.progress === "cart"} 
            onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>

            {cartCtx.items.length === 0 && console.log("Cart is Empty!")}

            {cartCtx.items.length > 0 ? (
                <ul>
                    {cartCtx.items.map((item) => (
                        <CartItem 
                            key={item.id} 
                            id={item.id} 
                            name={item.name} 
                            quantity={item.quantity} 
                            price={item.price} 
                            onIncrease={cartCtx.addItem} 
                            onDecrease={cartCtx.removeItem} 
                        />
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}

            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
              <Button textOnly onClick={handleCloseCart}>Close</Button>
              {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go To Checkout</Button>}
            </p>
        </Modal>
    );
}

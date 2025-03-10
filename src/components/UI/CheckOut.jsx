import { useState, useContext, useEffect } from "react";
import emailjs from "emailjs-com";  
import Modal from "./Modal.jsx";
import { CartContext } from "../../store/CartContext";
import { UserProgressContext } from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "./Button.jsx";
import Input from "./Input.jsx";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    const [orderSuccess, setOrderSuccess] = useState(false);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    useEffect(() => {
        console.log("Checkout Modal Open Status:", userProgressCtx.progress === "checkout");
    }, [userProgressCtx.progress]);

    const handleCancel = () => {
        console.log("Cancelling Checkout!");
        userProgressCtx.hideCheckout();
    };

    const handleSubmitOrder = (event) => {
        event.preventDefault();
        console.log("Submitting Order!");

        const templateParams = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            totalAmount: currencyFormatter.format(cartTotal),
            items: cartCtx.items.map(item => `${item.quantity} x ${item.name}`).join(", "),
        };

        emailjs.send(
            "service_xi3j797",    
            "template_pz7fmur",    
            templateParams,
            "5dyMmwHgi3inWloVd"     
        )
        .then(response => {
            console.log("Email Sent Successfully!", response.status, response.text);
            setOrderSuccess(true);
            cartCtx.items = []; 
            userProgressCtx.hideCheckout();
        })
        .catch(error => console.error("Email Sending Error:", error));
    };

    return (
        <>
            <Modal open={userProgressCtx.progress === "checkout"}>
                <form onSubmit={handleSubmitOrder}>
                    <h2>Checkout</h2>
                    <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                    <Input label="Full Name" type="text" id="name" required />
                    <Input label="Email Address" type="email" id="email" required />
                    <Input label="Address" type="text" id="address" required />
                    <div className="control-row">
                        <Input label="Postal Code" type="text" id="postal" required className="half-width" />
                        <Input label="City" type="text" id="city" required className="half-width" />
                    </div>

                    <p className="modal-actions">
                        <Button textOnly onClick={handleCancel}>Cancel</Button>
                        <Button type="submit">Submit Order</Button>
                    </p>
                </form>
            </Modal>

          
            <Modal open={orderSuccess} onClose={() => setOrderSuccess(false)}>
                <h2>Order Successful!</h2>
                <p>Your order has been placed successfully. 🎉</p>
                <Button onClick={() => setOrderSuccess(false)}>OK</Button>
            </Modal>
        </>
    );
}

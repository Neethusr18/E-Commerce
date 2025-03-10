
import { createContext, useState, useEffect } from "react";

export const UserProgressContext = createContext({
    progress: "",
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
});

export default function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState("");

    // Debugging log: Track whenever userProgress changes
    useEffect(() => {
        console.log("User Progress Updated:", userProgress);
    }, [userProgress]);

    const showCart = () => {
        console.log("showCart() called!");  
        setUserProgress("cart");
    };
    
    const hideCart = () => {
        console.log("hideCart() called!");  
        setUserProgress("");
    };

    const showCheckout = () => {
        console.log("showCheckout() called!");  
        setUserProgress("checkout");
    };

    const hideCheckout = () => {
        console.log("hideCheckout() called!");  
        setUserProgress("");
    };

    const contextValue = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    };

    return (
        <UserProgressContext.Provider value={contextValue}>
            {children}
        </UserProgressContext.Provider>
    );
}

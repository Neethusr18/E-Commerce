import { useReducer, createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
});

function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        if (existingCartItemIndex > -1) {
            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingCartItemIndex];

            if (existingItem.quantity === 1) {
                updatedItems.splice(existingCartItemIndex, 1);
            } else {
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity - 1
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                ...state,
                items: updatedItems,
            };
        }

    }

    return state;
}


export function CartContextProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatch({ type: "ADD_ITEM", item });
    }

    function removeItem(id) {
        dispatch({ type: "REMOVE_ITEM", id });
    }

    const contextValue = {
        items: cart.items,
        addItem,
        removeItem
    };

    console.log(CartContext);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export {CartContext};

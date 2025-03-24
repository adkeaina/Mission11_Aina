import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <button 
            className="btn btn-white border border-2 d-flex align-items-center gap-2 px-3 py-2 fw-bold shadow-sm"
            onClick={() => navigate('/cart')}
            style={{ backgroundColor: "white", color: "#333" }}
        >
            🛒 Cart ({totalItems}) - ${totalAmount.toFixed(2)}
        </button>
    );
};

export default CartSummary;
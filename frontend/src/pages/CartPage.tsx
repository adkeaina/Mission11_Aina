import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Cart Items */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-lg rounded-4 p-5">
                        <h3 className="text-success fw-bold text-center">Your Cart</h3>
                        {cart.length ? (
                            <ul className="list-group mt-4">
                                {cart.map((item: CartItem) => (
                                    <li key={item.bookId} className="list-group-item d-flex justify-content-between align-items-center p-3 border-0">
                                        <div className="d-flex align-items-center">
                                            <div className="text-start">
                                                <h5 className="fw-bold">{item.title}</h5>
                                                <p className="mb-1 text-muted">
                                                    <strong>Price:</strong> ${item.price.toFixed(2)}
                                                </p>
                                                <p className="mb-1 text-muted">
                                                    <strong>Quantity:</strong> {item.quantity}
                                                </p>
                                                <p className="mb-1 text-muted">
                                                    <strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeFromCart(item.bookId)}
                                        >
                                            Remove One
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="lead text-muted mt-4">
                                Your cart is empty. Please add some books to your cart.
                            </p>
                        )}
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-lg rounded-4 p-5">
                        <h4 className="text-center fw-bold">Cart Summary</h4>
                        <hr />
                        <div className="d-flex justify-content-between mt-3">
                            <span className="fw-bold">Total Amount</span>
                            <span className="text-success fw-bold">${totalAmount.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-center mt-4">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => navigate("/")} // Go back to the previous page
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
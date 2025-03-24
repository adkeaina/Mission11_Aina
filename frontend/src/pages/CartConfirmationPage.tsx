import { useNavigate, useParams } from "react-router-dom";

export default function CartConfirmationPage() {
    const navigate = useNavigate();
    const { title, quantity } = useParams();

    return (
        <div className="container mt-5">
            <div className="card border-0 shadow-lg rounded-4 p-5 text-center">
                <h3 className="text-success fw-bold">
                    {quantity !== "1" ? `${quantity} copies of` : ""} "{title}" Added to Cart!
                </h3>
                <p className="lead text-muted">
                    {quantity !== "1" ? `${quantity} copies of` : ""} "{title}" {quantity !== "1" ? 'have' : 'has'} been successfully added to the cart. 
                    You can continue shopping or proceed to checkout.
                </p>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>
                    <button
                        className="btn btn-success btn-lg"
                        onClick={() => navigate("/cart")}
                    >
                        Proceed to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
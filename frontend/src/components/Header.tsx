import CartSummary from "./CartSummary";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-3 shadow">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <h1 className="text-white m-0 fw-bold" onClick={() => navigate('/')}>📚 Book Store</h1>
                <div className="d-flex align-items-center gap-3">
                    <button 
                        className="btn btn-light fw-bold"
                        onClick={() => navigate("/admin")}
                    >
                        Admin Panel
                    </button>
                    <CartSummary />
                </div>
            </div>
        </nav>
    );
}
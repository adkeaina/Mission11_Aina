import CartSummary from "./CartSummary";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-3 shadow">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <h1 className="text-white m-0 fw-bold">📚 Book Store</h1>
                <CartSummary />
            </div>
        </nav>
    );
}
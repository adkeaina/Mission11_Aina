import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../types/Book";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

export default function BookPage() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch(`https://localhost:5000/api/Book/GetBookById/${bookId}`, {
                credentials: "include",
            });
            const data = await response.json();
            setBook(data);
        };

        fetchBook();
    }, [bookId]);

    const handleAddToCart = () => {
        const bookToAdd : CartItem = {
            bookId: Number(bookId),
            title: book?.title || "Book Title",
            price: book?.price || 0,
            quantity
        }
        addToCart(bookToAdd);
        navigate(`/confirmation/${book?.title || 'No Title'}/${quantity}`);
    };

    if (!book) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="container mt-5">
            <div className="card border-0 shadow-lg rounded-4 p-4">
                <div className="card-body text-center">
                    <h3 className="text-primary fw-bold">{book.title}</h3>
                    <h5 className="text-muted">{book.author}</h5>
                    <ul className="list-unstyled mt-3">
                        <li><strong>📖 Publisher:</strong> {book.publisher}</li>
                        <li><strong>🔖 ISBN:</strong> {book.isbn}</li>
                        <li><strong>📂 Category:</strong> {book.classification} / {book.category}</li>
                        <li><strong>📄 Pages:</strong> {book.pageCount}</li>
                        <li className="text-success fw-bold"><strong>💰 Price:</strong> ${book.price}</li>
                    </ul>

                    {/* Quantity Selector */}
                    <div className="mt-3 d-flex align-items-center justify-content-center">
                        <button 
                            className="btn btn-outline-secondary" 
                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            disabled={quantity === 1}
                        >
                            <i className="bi bi-dash-lg"></i>
                        </button>

                        <input
                            type="number"
                            className="form-control text-center mx-2"
                            style={{ width: "60px" }}
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                            disabled
                        />

                        <button 
                            className="btn btn-outline-secondary" 
                            onClick={() => setQuantity((prev) => prev + 1)}
                        >
                            <i className="bi bi-plus-lg"></i>
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4">
                        <button className="btn btn-success btn-lg me-3" onClick={handleAddToCart}>
                            <i className="bi bi-cart-plus"></i> Add to Cart
                        </button>
                        <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/')}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
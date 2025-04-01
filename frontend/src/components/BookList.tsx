import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BookAPI";
import Pagination from "./Pagination";
export default function BookList({selectedCategories} :  {selectedCategories: string[]}) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // New state for sorting
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNumber, selectedCategories);
                setBooks(data.books);
                setTotalPages(data.pageCount);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        }

        loadBooks();
    }, [pageSize, pageNumber, selectedCategories]);

    if (loading) {
        return <p>Loading books...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    // Function to sort books by title
    const sortedBooks = [...books].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    return (
        <>
            <div className="container mt-5">
                <div className="d-grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                    {sortedBooks && sortedBooks.map((book) => (
                        <div className="card border-0 shadow-lg rounded-4 p-3" key={book.bookId} style={{ transition: "transform 0.3s ease-in-out" }}>
                            <div className="card-body">
                                <h5 className="card-title text-primary fw-bold">{book.title}</h5>
                                <h6 className="card-subtitle mb-3 text-muted">{book.author}</h6>
                                <ul className="list-unstyled">
                                    <li><strong>📖 Publisher:</strong> {book.publisher}</li>
                                    <li><strong>🔖 ISBN:</strong> {book.isbn}</li>
                                    <li><strong>📂 Category:</strong> {book.classification} / {book.category}</li>
                                    <li><strong>📄 Pages:</strong> {book.pageCount}</li>
                                    <li className="text-success fw-bold"><strong>💰 Price:</strong> ${book.price}</li>
                                </ul>

                                <button className="btn btn-warning btn-lg" onClick={() => navigate(`/book/${book.bookId}`)}>
                                    <i className="bi bi-cart-plus"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Pagination 
                pageNumber={pageNumber}
                totalPages={totalPages}
                pageSize={pageSize}
                setPageNumber={setPageNumber}
                setPageSize={setPageSize}
            />

            <div className="d-flex justify-content-center align-items-center mt-4">
                {/* Sorting Dropdown */}
                <label className="form-label mb-0 mx-2">
                    Sort by Title:
                </label>
                <select
                    className="form-select form-select-sm rounded-pill shadow-sm w-auto"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </>
    );
}
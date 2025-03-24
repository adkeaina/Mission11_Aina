import { useEffect, useState } from "react";
import { Book } from "./types/Book";
export default function BookList({selectedCategories} :  {selectedCategories: string[]}) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // New state for sorting

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories
                .map((c) => `categories=${encodeURIComponent(c)}`)
                .join('&');
            const response = await fetch(`https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length ? `&${categoryParams}` : ''}`,
                {
                    credentials: 'include',
                }
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalPages(data.pageCount);
        }

        fetchBooks();
    }, [pageSize, pageNumber, totalPages, selectedCategories]);

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
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-4">
                <button
                    className="btn btn-outline-primary mx-2 rounded-pill shadow-sm"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    Previous
                </button>

                {
                    [...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={`btn mx-1 rounded-pill ${pageNumber === index + 1 ? 'btn-primary text-white' : 'btn-outline-secondary'}`}
                            onClick={() => setPageNumber(index + 1)}
                            disabled={pageNumber === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))
                }

                <button
                    className="btn btn-outline-primary mx-2 rounded-pill shadow-sm"
                    disabled={pageNumber === totalPages}
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    Next
                </button>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="form-label mb-0 mx-2">
                    Results per page:
                </label>
                <select
                    className="form-select form-select-sm rounded-pill shadow-sm w-auto"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageNumber(1); // Reset to first page when changing page size
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>

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
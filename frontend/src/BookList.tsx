import { useEffect, useState } from "react";
import { Book } from "./types/Book";

export default function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:4000/api/Book/AllBooks');
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
        <>
            <h1>Book List</h1>
            <br />
            <div className="container mt-4">
                <div className="row">
                    {books && books.map((book) => (
                        <div className="col-md-4 mb-4" key={book.bookId}>
                            <div className="card border border-dark rounded-3 shadow-sm h-100 p-3">
                                <div className="card-body">
                                    <h2 className="card-title text-primary fw-bold">{book.title}</h2>
                                    <h3 className="card-subtitle mb-3 text-muted">{book.author}</h3>
                                    <div className="card-text">
                                        <p><strong>Publisher:</strong> {book.publisher}</p>
                                        <p><strong>ISBN:</strong> {book.isbn}</p>
                                        <p><strong>Category:</strong> {book.classification} / {book.category}</p>
                                        <p><strong>Pages:</strong> {book.pageCount}</p>
                                        <p className="text-success fw-bold"><strong>Price:</strong> ${book.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
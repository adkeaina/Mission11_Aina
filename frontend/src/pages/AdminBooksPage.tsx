import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BookAPI";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import '../styles/AdminBooksPage.css';

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNumber, []);
                setBooks(data.books);
                setTotalPages(data.pageCount);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        }

        loadBooks();
    }, [pageSize, pageNumber]);

    const handleDeleteBook = async (bookId: number) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this book?'
        );
        if (!confirmDelete) return;

        try {
            await deleteBook(bookId);
            setBooks(books.filter((b) => b.bookId !== bookId));
        } catch (error) {
            alert('Failed to delete project. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-center mt-5"><p>Loading books...</p></div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger"><p>Error: {error}</p></div>;
    }

    return (
        <div className="container mt-4">
            <Header />
            <br />
            <h1 className="mb-4">Admin Books</h1>

            <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>Add Book</button>
            <br />

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>ISBN</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookId}>
                                <td>{book.bookId}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.isbn}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => {setEditingBook(book); setShowForm(true);}}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDeleteBook(book.bookId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                totalPages={totalPages}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageNumber={setPageNumber}
                setPageSize={setPageSize}
            />

            {showForm && (
                <div className="overlay">
                    <div className="edit-form-container">
                        <NewBookForm
                            book={editingBook}
                            onSuccess={() => {
                                setEditingBook(null);
                                setShowForm(false);
                                fetchBooks(pageSize, pageNumber, []).then(data => {
                                    setBooks(data.books);
                                    setTotalPages(data.pageCount);
                                });
                            }
                            }
                            onCancel={() => {setEditingBook(null); setShowForm(false);}}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminBooksPage;
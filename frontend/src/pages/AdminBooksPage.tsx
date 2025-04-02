import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BookAPI";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);

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

    const handleEditBook = () => {
        navigate('/admin/books/edit/1');
    }

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

            {showForm ?
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNumber, []).then(data => {
                            setBooks(data.books);
                            setTotalPages(data.pageCount);
                        });
                    }} onCancel={() => setShowForm(false)}
                />
                :
                <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>Add Book</button>
            }
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
                                    <button className="btn btn-primary" onClick={() => alert('Edit functionality coming soon!')}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">Delete</button>
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
        </div>
    );
}

export default AdminBooksPage;
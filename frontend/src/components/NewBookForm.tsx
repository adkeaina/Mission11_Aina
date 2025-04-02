import { ChangeEvent, FormEvent, useState } from "react";
import { Book } from "../types/Book";
import { addBook, updateBook } from "../api/BookAPI";

interface NewBookFormProps {
    book: Book | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function NewBookForm({ book, onSuccess, onCancel }: NewBookFormProps) {
    const [formData, setFormData] = useState<Book>(book || {
        bookId: 0,
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        classification: "",
        category: "",
        pageCount: 0,
        price: 0    
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (book) {
            await updateBook(formData);
        } else {
            await addBook(formData);
        }
        onSuccess();
    }

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4">{book ? 'Update' : 'Add New'} Book</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="title" className="form-label">Book Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="author" className="form-label">Author</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="publisher" className="form-label">Publisher</label>
                            <input
                                type="text"
                                className="form-control"
                                id="publisher"
                                name="publisher"
                                value={formData.publisher}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="isbn" className="form-label">ISBN</label>
                            <input
                                type="text"
                                className="form-control"
                                id="isbn"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="classification" className="form-label">Classification</label>
                            <input
                                type="text"
                                className="form-control"
                                id="classification"
                                name="classification"
                                value={formData.classification}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="pageCount" className="form-label">Page Count</label>
                            <input
                                type="number"
                                className="form-control"
                                id="pageCount"
                                name="pageCount"
                                value={formData.pageCount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">{book ? 'Update' : 'Add'} Book</button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    pageCount: number;
}

const apiBaseUrl = 'https://localhost:5000/api/Book';

export async function fetchBooks(
    pageSize: number,
    pageNumber: number,
    selectedCategories: string[],
): Promise<FetchBooksResponse> {
    try {
        const categoryParams = selectedCategories
            .map((c) => `categories=${encodeURIComponent(c)}`)
            .join('&');
        const response = await fetch(`${apiBaseUrl}/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length ? `&${categoryParams}` : ''}`,
            {
                credentials: 'include',
            }
        );
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch books');
    }
}

export async function addBook(book: Book): Promise<Book> {
    try {
        const response = await fetch(`${apiBaseUrl}/AddBook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
                credentials: 'include',
            });
        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to add book');
    }
}

export async function updateBook(book: Book): Promise<Book> {
    try {
        const response = await fetch(`${apiBaseUrl}/UpdateBook`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
                credentials: 'include',
            });
        if (!response.ok) {
            throw new Error('Failed to update book; wrong bookId or sumn');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Womp womp');
    }
}

export async function deleteBook(bookId: number): Promise<void> {
    try {
        const response = await fetch(`${apiBaseUrl}/DeleteBook/${bookId}`, {
                method: 'DELETE',
            });
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete book');
    }
}
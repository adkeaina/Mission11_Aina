import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Header from "../components/Header";

export default function BookListPage() {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className='container mt-4'>
            <Header />
            <div className='row'>
            <div className='col-md-3'>
                <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                />
            </div>
            <div className='col-md-6'>
                <BookList selectedCategories={selectedCategories} />
            </div>
            <div className='col-md-3' />
            </div>
        </div>
    );
}

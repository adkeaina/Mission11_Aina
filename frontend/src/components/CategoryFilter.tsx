import { useState, useEffect } from "react";
import { fetchBookCategories } from "../api/BookAPI";

export default function CategoryFilter({
    selectedCategories,
    setSelectedCategories
}: {
    selectedCategories: string[]; 
    setSelectedCategories: (categories: string[]) => void;
}) {

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        try {
            // Fetch categories from an API or define them statically
            const fetchCategories = async () => {
                const data = await fetchBookCategories();
                setCategories(data);
            }
            fetchCategories();
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }, []);

    function handleCheckboxChange({target} : {target : HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(c => c !== target.value) : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
        console.log(target.value);
    }
    

    return (
        <div>
            <h5>Book Categories</h5>
            <div>
                {categories.map((c) => (
                    <div key={c} className="form-check">
                        <input className="form-check-input" type="checkbox" value={c} id={c} onChange={handleCheckboxChange} />
                        <label className="form-check-label" htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
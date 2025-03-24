import { useState } from 'react';
import './App.css'
import BookList from './BookList'
import CategoryFilter from './components/CategoryFilter';
import FingerPrint from './FingerPrint';


function App() {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className='container'>
        <div className='row bg-primary text-white'>
            <h1 className='text-center p-4'>Book List</h1>
        </div>
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
      <FingerPrint />
    </>
  )
}

export default App

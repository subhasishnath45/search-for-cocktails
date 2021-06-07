import React, {useRef, useEffect} from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext();
  // searchValue stores a value for search without causing re-rendering.
  const searchValue = useRef('');

  useEffect(()=>{
    // focusing on the form input field.
    searchValue.current.focus();
  },[])

  // following method is setting and updating search terms
  const searchCocktail = ()=>{
    // accessing the current property value of searchValue object.
    setSearchTerm(searchValue.current.value);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search Cocktail:</label>
          <input type="text" id="name" ref={searchValue} onChange={searchCocktail}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm

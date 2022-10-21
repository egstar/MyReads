import React, {useState,useEffect} from "react";
import * as BooksAPI from '../../Backend/BooksAPI'
import Book from "../Book/Book";

const SearchBar = ({setShowSearchpage}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [BooksList, setBooksList] = useState([])
    
    const SearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase().toString().trim())
        if(searchQuery && e.target.value !== ""){
            BooksAPI.search(searchQuery.toLowerCase().toString().trim(), 30)
            .then(books => {
                books.length>0 ? setBooksList(books) : setBooksList([])
            })
        } else {
            setBooksList([])
        }
    }
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              href="#close"
              onClick={() => setShowSearchpage(false)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Type (book name / author name)"
                value={searchQuery}
                onChange={SearchQuery}
              />
            </div>
          </div>
          {searchQuery.length> 0 ? <div className="searchbar-tip"><span style={{color: BooksList.length>0 ? "green": "red",textDecoration:"underline",margin:"0px 5px",}}>{BooksList.length} </span> Books has been found.</div>: <></>}
          <div className="search-books-results">
            <ol className="books-grid">
                { BooksList.length > 0 ? 
                    BooksList.map((book) =>
                    <Book key={book.id} book={book} />) : <></>}
            </ol>
          </div>
        </div>
    )
}

export default SearchBar;
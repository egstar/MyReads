import React, {useEffect,useState} from "react";
import * as BooksAPI from '../../Backend/BooksAPI'
import Book from "../Book/Book";
import { Link } from "react-router-dom";


const SearchBar = () => {
  
  const [searchQuery, setSearchQuery] = useState('')
  const [BooksList, setBooksList] = useState([
    {
      currentBooks: []
    ,
      matchedBooks: []
    }
  ])
  useEffect(() => {
    if(BooksList.currentBooks && BooksList.currentBooks.length<= 0){
    BooksAPI.getAll()
    .then((current) => {
      setBooksList({...BooksList, currentBooks: [current]})
    })}
  },[BooksList])
  let matched;

  const SearchQuery = (e) => {
      setSearchQuery(e.target.value.toLowerCase().toString())
      if(searchQuery && e.target.value !== ""){
        BooksAPI.search(searchQuery.toLowerCase().toString().trim(), 30)
        .then(books => {
          books.length > 0 ? matched = books.filter((book) => book.title.toLowerCase().includes(searchQuery)) : matched = []

          matched.length > 0 ? setBooksList({...BooksList, matchedBooks: matched}) : setBooksList({...BooksList, matchedBooks: []})
        })
    } else {
        setBooksList([])
    }
  }
  
  return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={`/`}
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Type Book name here"
              value={searchQuery}
              onChange={SearchQuery}
              
            />
          </div>
        </div>
        {searchQuery.length > 0 && BooksList.matchedBooks ? <div className="searchbar-tip"><span style={{color: BooksList.matchedBooks.length>0 ? "green": "maroon",textDecoration:"underline",margin:"0px 5px",}}>{BooksList.matchedBooks.length} </span> Books has been found.</div>: <></>}
        <div className="search-books-results">
          <ol className="books-grid">
              { BooksList.matchedBooks && BooksList.matchedBooks.length > 0 ? 
                  BooksList.matchedBooks.map((book) =>
                  <Book key={book.id} book={book} shelf={book.shelf} />) : <></>}
          </ol>
        </div>
      </div>
  )
}

export default SearchBar;
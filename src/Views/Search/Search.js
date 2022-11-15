import { Link } from "react-router-dom";
import Book from "../../Components/Book/Book";
import { DebounceInput } from "react-debounce-input";

const SearchView = (props) => {
    const {searchQuery,SearchQuery,BooksList,shelves,setBooks,books,setMounted,Mounted} = props
    
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to={`/`}
              className="close-search"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <DebounceInput
                minLength={2}
                debounceTimeout={250}
                element="input"
                type="text"
                placeholder="Type Book name here"
                onChange={SearchQuery}
                
              />
            </div>
          </div>
          {searchQuery.length > 0 && BooksList.matchedBooks ? <div className="searchbar-tip"><span style={{color: BooksList.matchedBooks.length>0 ? "green": "maroon",textDecoration:"underline",margin:"0px 5px",}}>{BooksList.matchedBooks.length} </span> Books has been found.</div>: <></>}
          <div className="search-books-results">
            <ol className="books-grid">
                { BooksList.matchedBooks && BooksList.matchedBooks.length > 0 
                ? BooksList.currentBooks && BooksList.currentBooks.length > 0 && BooksList.currentBooks.includes({id: BooksList.matchedBooks.map((books) => books.id)})
                    ? BooksList.currentBooks.map((book) => 
                    <Book
                        key={book.id}
                        book={book}
                        Shelf={book.shelf}
                        shelves={shelves}
                        setBooks={ setBooks}
                        books={books}
                        setMounted={ setMounted}
                        Mounted={Mounted}
                    />
                    )
                    : BooksList.matchedBooks.map((book) => 
                    <Book
                        key={book.id}
                        book={book}
                        Shelf={"none"}
                        shelves={shelves}
                        setBooks={ setBooks}
                        books={books}
                        setMounted={ setMounted}
                        Mounted={Mounted}
                    />
                    )
                : <></>}
            </ol>
          </div>
        </div>
    )
}

export default SearchView;
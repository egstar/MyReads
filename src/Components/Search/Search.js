import React, {useEffect,useState} from "react";
import * as BooksAPI from '../../Backend/BooksAPI'
import SearchView from "../../Views/Search/Search";

const SearchBar = (props) => {
  const { books,setBooks,setMounted,shelves,Mounted } = props
  const [searchQuery, setSearchQuery] = useState('')
  const [BooksList, setBooksList] = useState([
    {
      currentBooks: [books]
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
        .then(mybooks => {
          mybooks.length > 0 ? matched = mybooks.filter((book) => book.title.toLowerCase().includes(searchQuery)) : matched = []

          matched.length > 0 ? setBooksList({...BooksList, matchedBooks: matched}) : setBooksList({...BooksList, matchedBooks: []})
        })
    } else {
        setBooksList([])
    }
  }
  
  return (
    <SearchView 
      searchQuery={searchQuery}
      SearchQuery={SearchQuery}
      BooksList={BooksList}
      shelves={shelves}
      setBooks={ setBooks}
      books={books}
      setMounted={ setMounted}
      Mounted={Mounted}
     />
  )
}

export default SearchBar;
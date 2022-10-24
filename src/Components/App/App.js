import  {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import MainPage from "../Main/Main";
import SearchBar from "../Search/Search";
import Index from "../Main/Index";
import { useEffect, useState } from "react";
import * as BooksAPI from '../../Backend/BooksAPI'

const App = () => {
  const shelves = [
    { name: "currentlyReading", title : "Currently Reading" },
    { name: "wantToRead", title : "Want to Read" },
    { name: "read", title: "Read" },
    { name: "none", title:"None"}
  ]
  const [books, setBooks] = useState([])
  const [Mounted, setMounted] = useState(false)
  window.onload =() => {
    setMounted(true)
  }
  useEffect(() => {
    if(Mounted===true){
    BooksAPI.getAll()
    .then((mybooks) => {
            if(mybooks !== books){
                setBooks(mybooks)
            }
        })
    }
    return () => setMounted(false)
  }, [Mounted,books])

  let color= Mounted===true ? "lightgreen" : "red"
  console.log("%cUnmounted:%c %c"+Mounted, "font-weight:bold;background:navy;color:white","color:white","text-decoration:underline;color:"+color)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<MainPage books={books} setBooks={ setBooks} setMounted={ setMounted} Mounted={Mounted} shelves={shelves} />} />
          <Route path="/search" element={<SearchBar books={books} setBooks={ setBooks} setMounted={ setMounted} Mounted={Mounted} shelves={shelves} />} />
        </Route>
      </Routes>
    </Router>
    
  );
}
export default App;

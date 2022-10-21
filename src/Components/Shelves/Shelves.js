import { useEffect, useState } from "react";
import Book from "../Book/Book";
import * as BooksAPI from '../../Backend/BooksAPI'

const ShelvesList = (props) => {
    const {Shelf, AllBooks} = props
    const shelves = [
        { shelfname: "currentlyReading", title : "Currently Reading" },
        { shelfname: "wantToRead", title : "Want to Read" },
        { shelfname: "read", title: "Read" },
        { shelfname: "none", title:"None"}
    ]
    const [Books, setBooks] = useState([])
    
    useEffect(() => {
        BooksAPI.getAll().then((books) => {
            setBooks(books)
        })
    }, [])

    return (
        <div className="bookshelf" key={Shelf}>
            <h2 className="bookshelf-title">{shelves.filter(({shelfname}) => shelfname === Shelf).map((shelf) => {return (shelf.title)})}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        Books.filter(({shelf}) => shelf === Shelf).length > 0
                        ? Books.filter(({shelf}) => shelf === Shelf).map((book) => <Book key={book.id} book={book} />)
                        : <h3><span style={{color:"red",textDecoration:"underline"}}>{Books.filter(({shelf}) => shelf === Shelf).length}</span> Books found in this shelf.</h3>
                    }
                </ol>
            </div>
        </div>
    )
}
export default ShelvesList;
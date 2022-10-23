import { useEffect, useState } from "react";
import Book from "../Book/Book";
import * as BooksAPI from '../../Backend/BooksAPI'
import PropTypes from 'prop-types'

const ShelvesList = (props) => {
    const {Shelf} = props
    const shelves = [
        { shelfname: "currentlyReading", title : "Currently Reading" },
        { shelfname: "wantToRead", title : "Want to Read" },
        { shelfname: "read", title: "Read" },
        { shelfname: "none", title:"None"}
    ]
    const [Books, setBooks] = useState([])

    useEffect(() => {
        let mounted = true;
        BooksAPI.getAll()
        .then((books) => {
            if(mounted){
                if(books !== Books){
                    setBooks(books)
                }
            }
        })
        return () => mounted = false
    }, [Books])
    
    
    return (
        <div className="bookshelf" key={Shelf}>
            <h2 className="bookshelf-title">{shelves.filter(({shelfname}) => shelfname === Shelf).map((shelf) => {return (shelf.title)})}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        Books.filter(({shelf}) => shelf === Shelf).length > 0
                        ? Books.filter(({shelf}) => shelf === Shelf).map((book) => <Book key={book.id} book={book} shelf={book.shelf} Books={Books} setBooks={setBooks} />)
                        : <h3><span style={{color:"red",textDecoration:"underline"}}>{Books.filter(({shelf}) => shelf === Shelf).length}</span> Books found in this shelf.</h3>
                    }
                </ol>
            </div>
        </div>
    )
}
ShelvesList.propTypes = {
    setBooks: PropTypes.func,
    Shelf: PropTypes.string.isRequired,
    book: PropTypes.objectOf(PropTypes.object),
}
export default ShelvesList;
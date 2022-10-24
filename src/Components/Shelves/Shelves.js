import Book from "../Book/Book";
import PropTypes from 'prop-types'

const ShelvesList = (props) => {
    const {Shelf,shelves,books,setBooks,setMounted,Mounted} = props
    return (
        <div className="bookshelf" key={Shelf}>
            <h2 className="bookshelf-title">{shelves.filter(({name}) => name === Shelf.name).map((shelf) => {return (shelf.title)})}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.filter(({shelf}) => shelf === Shelf.name).length > 0
                        ? books.filter(({shelf}) => shelf === Shelf.name).map((book) => <Book key={book.id} book={book} Shelf={book.shelf} books={books} setBooks={ setBooks} shelves={shelves} setMounted={ setMounted} Mounted={Mounted}/>)
                        : <h3><span style={{color:"red",textDecoration:"underline"}}>{books.filter(({shelf}) => shelf === Shelf.name).length}</span> Books found in this shelf.</h3>
                    }
                </ol>
            </div>
        </div>
    )
}
ShelvesList.propTypes = {
    setBooks: PropTypes.func,
    Shelf: PropTypes.object.isRequired,
    book: PropTypes.objectOf(PropTypes.object),
}
export default ShelvesList;